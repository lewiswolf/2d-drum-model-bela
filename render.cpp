#include <Bela.h>
#include <libraries/Gui/Gui.h>

Gui gui;

float gSize = 0;			// R (size of drum)
float gDecay = 1000;		// decay time in ms

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
	float R = gui.getDataBuffer(0).getAsFloat()[0];
	float decay = gui.getDataBuffer(1).getAsFloat()[0];
	float* event = gui.getDataBuffer(2).getAsFloat();
                    
	rt_printf("size %f \n", R);
	rt_printf("decay %f \n", decay);
	rt_printf("eventType %f r %f theta %f \n", event[0], event[1], event[2]);
}

void cleanup(BelaContext *context, void *userData) { }
