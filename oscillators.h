#pragma once
#include <Bela.h>
#include <cmath>

class Osc {
	public:
		Osc() {
			s_r = context.audioSampleRate;
			s_l = 1 / s_r;
		}
		float renderSine(float f, float a) {
			float out = a * sin(2.0 * M_PI * phi * (f * s_l));
			phi++;
			return out;
		}
	private:
		BelaContext* context;
		float phi = 0;		// phase
		float s_r = 0;		// sample rate in hz
		float s_l = 0; 		// sample length in ms
};
