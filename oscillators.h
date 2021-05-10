#pragma once
#include <Bela.h>
#include <cmath>

/*
	TODO:
	- infer Bela's samplerate with constructor
*/

class Osc {
	public:
		float renderSine(float f, float a){
			float out = a * sin(phi);
			phi += two_pi * f * s_l;
			if (phi > two_pi){
				phi -= two_pi;
			}
			return out;
		}
		// Osc(){
		// 	// BelaContext* context;
		// 	// s_r = &context->audioSampleRate;
		// 	s_r = 44100;
		// 	s_l = 1 / s_r;
		// }

	private:
		int s_r = 44100;			// sample rate in hz
		float s_l = 1.0 / s_r; 		// sample length in ms
		float phi = 0;				// phase
		float two_pi = 2.0 * M_PI;	// 2 * π
};