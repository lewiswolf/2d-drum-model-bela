#include <Bela.h>
#include <libraries/Gui/Gui.h>
#include <libraries/math_neon/math_neon.h>
#include "oscillator.hpp"
#include "bessel.hpp"

const short matrixd1 = 4;					// global matrix dim 1 => n
const short matrixd2 = 8;					// global matrix dim 2 => m
int t = 0;									// time
int gDecay;									// global decay length in ms
float gRadius;								// global radius
float gTheta;								// global theta from interface
float zeros[matrixd1][matrixd2];			// zero crossings of the bessel functions -> J_n(z_nm) = 0
float modes[matrixd1][matrixd2];			// modes of vibration in hz
float J[matrixd1][matrixd2];				// modal amplitudes

Gui gui;									// gui
Osc Oscillators[matrixd1][matrixd2];		// oscillators

void updateModes(float f_0){
	// update modes in relation to new fundamental
	for (unsigned int n = 0; n < matrixd1; n++) {
		for (unsigned int m = 0; m < matrixd2; m++){
			if (n == 0 && m == 0){
				modes[n][m] = f_0;
			} else {
				modes[n][m] = f_0 * (zeros[n][m] / zeros[0][0]);
			}
		}
	}
}

bool setup(BelaContext *context, void *userData) {
	// init gui
	gui.setup(context->projectName);
	gui.setBuffer('f', 1);					// R (size of drum)
	gui.setBuffer('f', 1);					// decay time in ms
	gui.setBuffer('f', 3);					// mouse or touch event (event type, r, theta)
											// 0 = mousedown, 1 = mouseup, 2 = drag, 3 = dragexit
	// init zeros & oscillators
	for (unsigned int n = 0; n < matrixd1; n++) {
		for (unsigned int m = 0; m < matrixd2; m++){
			// init oscillator
			Oscillators[n][m].setup(context);
			// find z_nm
			float zero = besselZero(n, m + 1);
			zeros[n][m] = zero;
		}
	}
	return true;
}

void render(BelaContext *context, void *userData) {
	// poll GUI
	float R = gui.getDataBuffer(0).getAsFloat()[0];			// R (size of drum)
	float decay = gui.getDataBuffer(1).getAsFloat()[0];		// decay time in ms
	float* event = gui.getDataBuffer(2).getAsFloat();		// mouse or touch event (event type, r, theta)

	// rt_printf("size %f \n", R);
	// rt_printf("decay %f \n", decay);
	// rt_printf("eventType %f r %f theta %f \n", event[0], event[1], event[2]);
	
	// update modes if drum size has changed
	if (gRadius != R) {
		gRadius = R;
		const int t = 2000; 			// tension in N/m
		const float sigma = 0.26;		// density in kg/m2
		float d = 2 * 0.01 * gRadius;	// diameter in m
		updateModes(0.766 * (sqrt(t / sigma) / d));
	}

	// prepare synth on mousedown event
	if (event[0] == 0.0) {
		// calulcate modal amplitudes relative to radial strike location 
		for (unsigned int n = 0; n < matrixd1; n++) {
			for (unsigned int m = 0; m < matrixd2; m++) {
				// this is slow, and may be sped up with c++17 cmath functions
				J[n][m] = bessel(0, zeros[n][m] * event[1]);
			}
		}
		// update other params
		gTheta = event[2];
		gDecay = (int)decay;
		t = (int)((gDecay / 1000) * context->audioSampleRate);
	}

	for (unsigned int sample = 0; sample < context->audioFrames; sample++) {
		// init output signal
		float output = 0;
		// if a mouseup event occured
		if (t != 0 && event[0] == 1.0) {
			// calculate amplitude
			float a = t / gDecay;
			// render mode
			for (unsigned int n = 0; n < matrixd1; n++) {
				for (unsigned int m = 0; m < matrixd2; m++) {
					float u_nm = Oscillators[n][m].renderWave(modes[n][m], a) * J[n][m];
					if (n != 0) {
						u_nm *= cosf_neon(n * gTheta) + sinf_neon(n * gTheta);
					}
					output += u_nm;
				}
			}
			// normalise and decrement
			output /= matrixd1 * matrixd2 * 100;
			t--;
		}
		// write to audio buffer
		for (unsigned int channel = 0; channel < context->audioOutChannels; channel++) {
			audioWrite(context, sample, channel, output);
		}
	}
}

void cleanup(BelaContext *context, void *userData) { }