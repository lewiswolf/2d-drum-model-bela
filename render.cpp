#include <Bela.h>
#include <libraries/Gui/Gui.h>

Gui gui;

bool setup(BelaContext *context, void *userData) {
	// init gui
	gui.setup(context->projectName);
	gui.setBuffer('f', 4);
	return true;
}

void render(BelaContext *context, void *userData) {
	DataBuffer& buffer = gui.getDataBuffer(0);
	float* data = buffer.getAsFloat();
}

void cleanup(BelaContext *context, void *userData) { }
