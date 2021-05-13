#pragma once
#include <Bela.h>
#include <libraries/math_neon/math_neon.h>
#include <cmath>

class Osc {
	public:
		// default constructor & destructor
		Osc(){};
		~Osc(){};
		// infer sample rate
		Osc(BelaContext *context){
			setup(context);
		};
		void setup(BelaContext *context){
			s_r = context->audioSampleRate;
			s_l = 1 / s_r;
		};
		// render output
		float renderWave(float f, float a){
			float out = 0;
			// if the incoming frequency is less than the nyquist frequency
			if (f < s_r * 0.5) {
				out = a * (cosf_neon(phi) + sinf_neon(phi));
				phi += two_pi * f * s_l;
				if (phi > two_pi){
					phi -= two_pi;
				}
			}
			return out;
		}

	private:
		float s_r = 0;				// sample rate in hz
		float s_l = 0;				// sample length in ms
		float phi = 0;				// phase
		float two_pi = 2.0 * M_PI;	// 2 * π
};