var sw;
var wavesurfer;

var defaultSpeed = 0.03;
var defaultAmplitude = 0.3;

var activeColors = [[32,133,252], [94,252,169], [253,71,103]];
var inactiveColors = [[241,243,245], [206,212,218], [222,226,230], [173,181,189]];

function displayRawAudio() {
  $('a.play').replaceWith(function(){
    return $("<audio controls><source src='" + $(this).attr('data') + "'>", {html: $(this).attr('data')});
  });
  return $("#display-audio").remove();
}

(function(window, document, undefined){
  window.onload = init;


  function setDefaultColor(sw, isActive) {
    for (idx=0; idx < sw.curves.length; idx++) {
      var curve = sw.curves[idx];

      if (isActive) {
        curve.color = activeColors[idx % activeColors.length];
      } else {
        curve.color = inactiveColors[idx % inactiveColors.length];
      }
    }
  }

  function init(){
    sw = new SiriWave9({
      amplitude: defaultAmplitude,
      container: document.getElementById('wave'),
      autostart: true,
      speed: defaultSpeed,
      style: 'ios9',
    });
    sw.setSpeed(defaultSpeed);
    setDefaultColor(sw, false);

    wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'violet',
      barWidth: 3,
      progressColor: 'purple'
    });

    wavesurfer.on('ready', function () {
      this.width = wavesurfer.getDuration() *
                   wavesurfer.params.minPxPerSec * wavesurfer.params.pixelRatio;
      this.peaks = wavesurfer.backend.getPeaks(width);

      wavesurfer.play();
    });

    wavesurfer.on('audioprocess', function () {
      var percent = wavesurfer.backend.getPlayedPercents();
      var height = this.peaks[parseInt(this.peaks.length * percent)];
      if (height > 0) {
        sw.setAmplitude(height*3);
      }
    });

    wavesurfer.on('finish', function () {
      sw.setSpeed(defaultSpeed);
      sw.setAmplitude(defaultAmplitude);
      setDefaultColor(sw, false);
    });

    $(".play").click(function() {
      wavesurfer.load(this.getAttribute("data"));

      sw.setSpeed(0.1)
      setDefaultColor(sw, true);

      //var lowpass = wavesurfer.backend.ac.createBiquadFilter();
      //wavesurfer.backend.setFilter(lowpass);
    });
  }
})(window, document, undefined);
