#include <Bela.h>
#include <libraries/Gui/Gui.h>

Gui gui;

float gSize = 0 			// R (size of drum)
float gDecay = 1000			// decay time in ms

bool setup(BelaContext *context, void *userData) {
	// init gui
	gui.setup(context->projectName);
	gui.setBuffer('f', 1);	// R
	gui.setBuffer('f', 1);	// decay
	gui.setBuffer('f', 3);	// mouse events (event type, r, theta)
							// 0 = mousedown, 1 = mouseup, 2 = drag, 3 = dragexit
	return true;
}

void render(BelaContext *context, void *userData) {
	DataBuffer& sizeBuffer = gui.getDataBuffer(0);
	DataBuffer& delayBuffer = gui.getDataBuffer(1);
	DataBuffer& eventBuffer = gui.getDataBuffer(2);

	float* size = sizeBuffer.getAsFloat(); 	// may need [0]s here?
	float* delay = sizeBuffer.getAsFloat();	// and here to turn it into a float, not a float array
	float* event = sizeBuffer.getAsFloat();
}

void cleanup(BelaContext *context, void *userData) { }
