/*

	In prototype JS,  modify the pointerX and pointerY methods

	Ticket #1253
	https://prototype.lighthouseapp.com/projects/8886/tickets/1253-eventpointerx-and-eventpointery-doesnt-work-on-mobile-safari-iphoneipad

*/

function pointerX(event) {
    var docElement = document.documentElement,
     body = document.body || { scrollLeft: 0 };

    if (event.changedTouches) return (event.changedTouches[0].clientX +
      (docElement.scrollLeft || body.scrollLeft) -
      (docElement.clientLeft || 0));

    return event.pageX || (event.clientX +
      (docElement.scrollLeft || body.scrollLeft) -
      (docElement.clientLeft || 0));
  }

  function pointerY(event) {
    var docElement = document.documentElement,
     body = document.body || { scrollTop: 0 };

    if (event.changedTouches) return (event.changedTouches[0].clientY +
      (docElement.scrollLeft || body.scrollLeft) -
      (docElement.clientLeft || 0));

    return  event.pageY || (event.clientY +
       (docElement.scrollTop || body.scrollTop) -
       (docElement.clientTop || 0));
  }


 /* 

	In dragdrop.js, modify the register & unregister event listeners in the 
	Draggable class

	Ticket #325
	https://prototype.lighthouseapp.com/projects/8887/tickets/325-dragdrop-activation-in-mobile-safari-iphoneipad

 */

 register: function(draggable) {
    if(this.drags.length == 0) {
      this.eventMouseUp   = this.endDrag.bindAsEventListener(this);
      this.eventMouseMove = this.updateDrag.bindAsEventListener(this);
      this.eventKeypress  = this.keyPress.bindAsEventListener(this);

      Event.observe(document, "mouseup", this.eventMouseUp);
      Event.observe(document, "mousemove", this.eventMouseMove);
      Event.observe(document, "keypress", this.eventKeypress);

      Event.observe(document, "touchstart", this.eventKeypress);
      Event.observe(document, "touchmove", this.eventMouseMove);
      Event.observe(document, "touchend", this.eventMouseUp);
    }
    this.drags.push(draggable);
  },

  unregister: function(draggable) {
    this.drags = this.drags.reject(function(d) { return d==draggable });
    if(this.drags.length == 0) {
      Event.stopObserving(document, "mouseup", this.eventMouseUp);
      Event.stopObserving(document, "mousemove", this.eventMouseMove);
      Event.stopObserving(document, "keypress", this.eventKeypress);

      Event.stopObserving(document, "mouseup", this.eventMouseUp);
      Event.stopObserving(document, "mousemove", this.eventMouseMove);
      Event.stopObserving(document, "keypress", this.eventKeypress);
    }
  },

