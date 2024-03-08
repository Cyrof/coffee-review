// import csvHandler from "../../scripts/csvHandler";

// function to handle closing the pop-up when clicking outside of it
function closePopUp(){
    // select the pop-up menu using its class
    let menu = $(".coffee-form-pop-up");

    // add a click event listener to the entire document
    $(document).click(function(event){
        // check if the clicked element is not the pop-up menu itself and not its descendent
        if(!menu.is(event.target) && menu.has(event.target).length == 0){
            // If the clicked element is not within the pop-up menu, hide the menu
            menu.hide();
            // remove the blur effect from the pop-up container to restore normal appearance
            $(".pop-up-container").removeClass("pop-up-blur");
        }
    })
}

// function to toggle the display of the pop-up menu
function pop_up(event){
    // stop the propagation of the event to prevent it from reaching the document click event
    event.stopPropagation();

    // toggle the display of the pop-up menu using its class
    $(".coffee-form-pop-up").toggle();

    // select the pop-up conatinaer using its class
    let pop_container = $(".pop-up-container");

    // check if the pop-up container has the blur class applied
    if (pop_container.hasClass("pop-up-blur")){
        // if the blur class is already applied, remove it to revert the visual effect
        pop_container.removeClass("pop-up-blur");
    } else {
        // if the blur class is not applied, add it to create a visual effect indicating focus on the pop-up
        pop_container.addClass("pop-up-blur");
        // call the closePopUp function to ensure proper handling of clicks outside the pop-up
        closePopUp();
    }
}

// const data = csvHandler.getData();

// control custom right click
$(document).ready(function() {
    document.oncontextmenu = function (e){
        let target = e.target.parentNode;

        // console.log(target.className.includes('cRow'));
        if (target.className.includes('cRow')){
            e.preventDefault();
            let dataIndex = target.className.split(" ")[0];

            $(".context-menu").css({
                top: e.pageY + "px",
                left: e.pageX + "px",
                display: "block"
            });

            $("#edit").children('a').attr('href', `/?id=${dataIndex}`);
            $("#del").children('a').attr('href', `/del?id=${dataIndex}`);
        }

        $(document).on('click', function(e) {
            if (!$(e.target).closest('.context-menu').length){
                $('.context-menu').hide()
            }
        })
    };
});