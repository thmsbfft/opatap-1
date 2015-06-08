
var midi = null;
navigator.requestMIDIAccess().then( onMIDISuccess, onMIDIFailure );

function onMIDISuccess(midiAccess) {
  console.log( ";-)" );
  midi = midiAccess;

  var inputs = midiAccess.inputs.values();

  for ( var input = inputs.next(); input && !input.done; input = inputs.next()) {
    console.log('Connected:', input.value.name);
    input.value.onmidimessage = MIDIMessageEventHandler;
  }

}

function onMIDIFailure(msg) {
  console.log( "Failed to get MIDI access - " + msg );
}

function MIDIMessageEventHandler(event) {
  if(event.data[0]!='248') {
    if(event.data[0]=='144') {

      // Key mapping
      var data = '';
      if(event.data[1]=='53') data = 81;        // Q
      else if(event.data[1]=='54') data = 87;   // W
      else if(event.data[1]=='55') data = 69;   // E
      else if(event.data[1]=='56') data = 82;   // R
      else if(event.data[1]=='57') data = 84;   // T
      else if(event.data[1]=='58') data = 89;   // Y
      else if(event.data[1]=='59') data = 85;   // U
      else if(event.data[1]=='60') data = 73;   // I
      else if(event.data[1]=='61') data = 79;   // O
      else if(event.data[1]=='62') data = 80;   // P
      else if(event.data[1]=='63') data = 65;   // A
      else if(event.data[1]=='64') data = 83;   // S
      else if(event.data[1]=='65') data = 68;   // D
      else if(event.data[1]=='66') data = 70;   // F
      else if(event.data[1]=='67') data = 71;   // G
      else if(event.data[1]=='68') data = 72;   // H
      else if(event.data[1]=='69') data = 74;   // J
      else if(event.data[1]=='70') data = 75;   // K
      else if(event.data[1]=='71') data = 76;   // L
      else if(event.data[1]=='72') data = 90;   // Z
      else if(event.data[1]=='73') data = 88;   // X
      else if(event.data[1]=='74') data = 67;   // C
      else if(event.data[1]=='75') data = 86;   // V
      else if(event.data[1]=='76') data = 66;   // B

      // Fire keyboard event
      simulateKeyPress(data);
    }
    else if(event.data[0]=='176') {
      if(event.data[2]=='1' || event.data[2]=='2' || event.data[2]=='3' || event.data[2]=='4') {
        // If one the knobs is turned, fire a spacebar event
        data = 32;
        simulateKeyPress(data);
      }
    }
  }
}

function simulateKeyPress(data) {
  var e = jQuery.Event("keydown");
  e.which = data;
  e.keyCode = data;
  $(window).trigger(e);
}