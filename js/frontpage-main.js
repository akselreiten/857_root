/**
 * Created by akselreiten on 13/03/16.
 */

var text = [
    '"Malaria is a life-threatening disease caused by parasites that are transmitted to people through the bites of infected female mosquitoes."',
    '"About 3.2 billion people – almost half of the world’s population – are at risk of malaria."',
    '"214 million malaria cases reported worldwide in 2015."'

];

var counter = 0;
updateText();

function updateText(){
    counter = (counter + 1) %3;
    document.getElementById('text-container').innerHTML = text[counter];
}
setInterval(updateText, 5000);