const ONE_SECOND = 1000;

class Zegar {
    constructor() {
        this.zegar = null; // interval
        this.currentTime = 0;
        this.limitTime = 0;
        this.$zegar = document.querySelector('#panelGry');
    }

    start() {
        this.render();
        this.zegar = setInterval(() => {
            this.currentTime += ONE_SECOND;
            this.render();
        }, ONE_SECOND);
    }

    render() {
        let diff = this.limitTime + this.currentTime;
        this.$zegar.textContent = Zegar.formatCzasu(diff);
    }

    stop() {
        clearInterval(this.zegar);
        }

    static formatCzasu(time) {
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
	
	let zegar = new Zegar();
    zegar.start();

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
	$('#kafNr'+nr).css('background-color','#dad4cd');
	$('#kafNr'+nr).css('border','3px solid #dad4cd');
	$('#kafNr'+nr).html('');
	$('#kafNr'+nr).css('cursor','default');
	$('#kafNr'+nr).css('background-color','#dad4cd');

	if (liczby[nr]==iloscKafelek)
	{
		
		$('#tablica').css('font-size','40px');
		$('#tablica').html('<br /><b>Udało Ci się! Wygrałeś!</b><br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>');
		
		var element = document.getElementById('panelGry');
		var zawartosc = 'Twój czas to:  '+element.textContent;
		$('#test').html(zawartosc);
	}
	liczby[nr]=100;
	document.getElementById(nr).setAttribute("onclick",";");
}