//@input SceneObject[] Masks
//@input SceneObject HiddenMask
//@input SceneObject InitializationText
//@input SceneObject HiddenMessage

let current_mask = -1;
let n_masks = script.Masks.length
let prev_tap = Date.now();
let all_masks_visited = false;
let hidden_displayed = false;

function init_logos()
{   
    script.InitializationText.enabled = true;
    script.HiddenMessage.enabled = false;
    script.Masks.forEach((Mask) => Mask.enabled = false);    
    script.HiddenMask.enabled = false;
}

function onTapped(eventData)
{   
    script.InitializationText.enabled = false;
    script.HiddenMessage.enabled = false;
    var current_tap = Date.now();
    var speed = current_tap - prev_tap;
    prev_tap = current_tap;
    
    //Check if user is ready to see the hidden mask
    if(!all_masks_visited || speed >= 300){
        script.HiddenMask.enabled = false;
        //Enable next mask 
        if(current_mask >=0){
            script.Masks[current_mask].enabled = false;
        }
        current_mask = (current_mask + 1) % n_masks;
        script.Masks[current_mask].enabled = true;
        if (current_mask == n_masks - 1){
            all_masks_visited = true;
        }
    }
    //If user clicks fast enough scare them!
    else{
        script.Masks.forEach((Mask) => Mask.enabled = false);    
        script.HiddenMask.enabled = true;
        script.HiddenMessage.enabled = true;
        hidden_displayed = true;
    }    
}

init_logos()
var event = script.createEvent("TapEvent");
event.bind(onTapped);