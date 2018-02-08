$(function(){
  let mode = false;
  let timeCounter = 0;
  let lapCounter = 0;
  let action;
  let lapNumber = 0;
  let timeM,timeS,timeCS,lapM,lapS,lapCS;
  hideShowBtns('#startButton','#lapButton');
  $('#startButton').click(function(){
    mode = true;
    hideShowBtns('#stopButton', '#lapButton');
    startAction();
  });
  $('#stopButton').click(function(){
    hideShowBtns('#resumeButton', '#resetButton');
    clearInterval(action);
  });
  $('#resumeButton').click(function(){
    hideShowBtns('#stopButton','#lapButton');
    startAction();
  });
  $('#resetButton').click(function(){
    location.reload();
  });
  $('#lapButton').click(function(){
    if(mode){
      clearInterval(action);
      lapCounter = 0;
      addLap();
      startAction();
    }
  });
    function hideShowBtns(a,b){
      $('.inp').hide();
      $(a).show();
      $(b).show();
    }
    function startAction(){
      action = setInterval(function(){
        timeCounter++;
        if(timeCounter == 100*60*100){
          timeCounter = 0;
        }
        lapCounter++;
        if(lapCounter == 100*60*100){
          lapCounter = 0;
        }
        updateTime();
      },10);
    }
    function updateTime(){
      timeM = Math.floor(timeCounter / 6000);
      timeS = Math.floor((timeCounter%6000)/100);
      timeCS = (timeCounter%6000)%100;

      $('#timeMinute').text(format(timeM));
      $('#timeSeconds').text(format(timeS));
      $('#timeCentiSeconds').text(format(timeCS));

      lapM = Math.floor(lapCounter/6000);
      lapS = Math.floor((lapCounter%6000)/100);
      lapCS = Math.floor(lapCounter%6000)%100;

      $('#lapMinute').text(format(lapM));
      $('#lapSeconds').text(format(lapS));
      $('#lapCentiSeconds').text(format(lapCS));
      // console.log(format(timeCS));
    }
    function format(number){
      const display = number < 10 ? `0${number}` : `${number}`;
      return display;
      // if(number < 10){
      //   return `0${number}`;
      // }
      // else{
      //   return `${number}`;
      // }
    }
    function addLap(){
      lapNumber++;
      let details =`<div class="row lapsLayout">
                    <div class="col-sm-8">
                    <p>Lap ${lapNumber}
                    </p>
                    </div>
                    <div class="col-sm-4">
                    <p><span>${format(lapM)}</span>:
                    <span>${format(lapS)}</span>:
                    <span>${format(lapCS)}</span>
                    </p>
                    </div>
                    </div>`
                    $(details).prependTo('#laps');
    }
});
