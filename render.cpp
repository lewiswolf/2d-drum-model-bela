#include <Bela.h>
#include <libraries/Gui/Gui.h>

Gui gui;

bool setup(BelaContext *context, void *userData) {
	// init gui
	gui.setup(context->projectName);
	gui.setBuffer('f', 1);	// R (size of drum)
	gui.setBuffer('f', 1);	// decay time in ms
	gui.setBuffer('f', 3);	// mouse or touch event (event type, r, theta)
							// 0 = mousedown, 1 = mouseup, 2 = drag, 3 = dragexit
	return true;
}

void render(BelaContext *context, void *userData) {
	float R = gui.getDataBuffer(0).getAsFloat()[0];			// R (size of drum)
	float decay = gui.getDataBuffer(1).getAsFloat()[0];		// decay time in ms
	float* event = gui.getDataBuffer(2).getAsFloat();		// mouse or touch event (event type, r, theta)
                    
	rt_printf("size %f \n", R);
	rt_printf("decay %f \n", decay);
	rt_printf("eventType %f r %f theta %f \n", event[0], event[1], event[2]);
}

void cleanup(BelaContext *context, void *userData) { }
