const ONE_SECOND = 1000;

class Clock {
    constructor() {
        this.clock = null; // interval
        this.currentTime = 0;
        this.limitTime = 0;
        this.$clock = document.querySelector('#panelGry');
    }

    start(time) {
        console.log('start', time);
        this.limitTime = time;
        this.render();
        this.clock = setInterval(() => {
            this.currentTime += ONE_SECOND;
            this.render();

            if (this.isStopped()) {
                this.stop();
            }
        }, ONE_SECOND);
    }

    isStopped() {
        return (this.limitTime + this.currentTime) == 300000;
    }

    render() {
        let diff = this.limitTime + this.currentTime;
        console.log('render', diff);
        this.$clock.textContent = Clock.formatTime(diff);
    }

    stop() {
        console.log('stop');
        clearInterval(this.clock);
        }

    static parseSeconds(formattedTime) {
        let [minutes, seconds] = formattedTime.split(':').map(Number);
        return (minutes * 60 * ONE_SECOND) + seconds * ONE_SECOND;
    }

    static formatTime(time) {
        let minutes = Math.floor(time / ONE_SECOND / 60);
        let seconds = time / ONE_SECOND % 60;
        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');
        return `${minutes}:${seconds}`
    }
}


function stworzPlansze(poziom)
{
	var rozmiar=parseInt(poziom);
	var iloscKafelek = rozmiar*rozmiar;
	var tresc_diva = "";
	var szerokoscPolaGry=rozmiar*100;
	$('#tablica').css('width',szerokoscPolaGry);


	liczby = [];
    do
    {
        for (i=0; i<iloscKafelek; i++) liczby[i]=-2;

        for (i=0; i<iloscKafelek; i++)
        {
            liczby[i] = Math.floor((Math.random()*iloscKafelek));
            for (j=0; j<iloscKafelek; j++)
            {
                if ((liczby[i]==liczby[j]&&i!=j)||(liczby[i]==i&&liczby[iloscKafelek-1]!=iloscKafelek-1))
                {
                    liczby[i] = Math.floor((Math.random()*iloscKafelek));
                    j=-1;
                }
            }
        }
    }
	while (liczby[iloscKafelek-1]==iloscKafelek-1);
	
	for (i=0; i<iloscKafelek; i++) liczby[i]++;
	
	let clock = new Clock();
    let time = Clock.parseSeconds('00:00');
    clock.start(time);

	for (i=0; i<iloscKafelek; i++)
	{
		var nrkafelki = "kafNr"+i;
		tresc_diva = tresc_diva + '<div class="kafelka" id="' + nrkafelki + '" onclick="sprawdz('+i+','+iloscKafelek+')">' +liczby[i]+ '</div>'; 
		if ((i+1) % rozmiar == 0) tresc_diva = tresc_diva + '<div style = "clear: both;"></div>';
	}
	
	$('#tablica').html(tresc_diva);

}

function sprawdz(nr,iloscKafelek)
{	
	if (liczby[nr]==1)
	{
		zakryjKafelek(nr,iloscKafelek);
	}
	else
	{
		var flaga = true;
		
		for (i=0; i<iloscKafelek; i++)
		{
			if (liczby[i]<liczby[nr])
			{
				flaga = false;
			}
		}
		
		if (flaga == true) 
		{

			zakryjKafelek(nr,iloscKafelek);
		}
	}
}


function zakryjKafelek(nr,iloscKafelek)
{ 
	$('#kafNr'+nr).css('background-color','#cfcecc');
	$('#kafNr'+nr).css('border','3px solid #cfcecc');
	$('#kafNr'+nr).html('');
	$('#kafNr'+nr).css('cursor','default');
	$('#kafNr'+nr).css('background-color','#cfcecc');

	if (liczby[nr]==iloscKafelek)
	{
		
		$('#tablica').css('font-size','40px');
		$('#tablica').html('<br /><b>Udało Ci się! Wygrałeś!</b><br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>');
		
		var element = document.getElementById('panelGry');
		var zawartosc = 'Twój czas to:  '+element.textContent;
		$('#test').html(zawartosc);
		
		Clock.stop();
	}
	liczby[nr]=100;
	document.getElementById(nr).setAttribute("onclick",";");
}



function setup() {

}

//window.onload = setup;