


function stworzPlansze(poziom)
{
	var rozmiar=parseInt(poziom);
	var iloscKafelek = rozmiar*rozmiar;
	var tresc_diva = "";
	var szerokoscPolaGry=rozmiar*100;
	$('#tablica').css('width',szerokoscPolaGry);


//var liczby = new Array(iloscKafelek);
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





	
	for (i=0; i<iloscKafelek; i++)
	{
		var nrkafelki = "kafNr"+i;
		tresc_diva = tresc_diva + '<div class="kafelka" id="' + nrkafelki + '" onclick="sprawdz('+i+','+iloscKafelek+')">' +liczby[i]+ '</div>'; 
		if ((i+1) % rozmiar == 0) tresc_diva = tresc_diva + '<div style = "clear: both;"></div>';
	}
	
	
	
	//var kafNr0 = document.getElementById('kafNr0');
	//kafNr0.addEventListener("click", function() { zakryjKafelek(0); });
	
	//document.getElementById("tablica").innerHTML = "Hej";
	
	$('#tablica').html(tresc_diva);
	//$('#kafNr2').css('background-color','#888888');
	//test
	//var testuje = 'liczby[0]';
	//$('#panelGry').html(testuje);
	
	
	

	
	
}

function sprawdz(nr,iloscKafelek)
{	
	
	//alert(liczby[iloscKafelek-1]);
	if (liczby[nr]==1)
	{
		liczby[nr]=100;
		zakryjKafelek(nr);
		
		//alert(liczby[nr]);
	}
	
	if (liczby[nr]!=1)
	{

		var flaga = true;
		
		for (i=0; i<25; i++)
		{
			//alert(liczby[i]);
			if (liczby[i]<liczby[nr]) {
				flaga = false;
				//alert(liczby[i]);
			}
		}
		
		if (flaga == true) 
		{
			liczby[nr]=100;
			zakryjKafelek(nr);
		}
			
		
	//alert(flaga);
	}
	
	
}


function zakryjKafelek(nr)
{ 
	$('#kafNr'+nr).css('background-color','#cfcecc');
	$('#kafNr'+nr).css('border','3px solid #cfcecc');
	$('#kafNr'+nr).html('');
	$('#kafNr'+nr).css('cursor','default');
	$('#kafNr'+nr).css('background-color','#cfcecc');

	document.getElementById(nr).setAttribute("onclick",";");
	
	
	
}
