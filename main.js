$(document).ready(function(){
    //list of items with the first style of animation (slide left)
    const animation_1 = document.querySelectorAll('.animate1');

    //setting up an observer; if an object is found to be intersecting
    //and hasn't recieved the class for animating the text, add it.
    const observer = new IntersectionObserver((objects) => {

        objects.forEach((object) => {
            if (object.isIntersecting) {
                object.target.classList.add('animate-text-left');
            }
        });

    },{threshold: 0.5});

    const observer2 = new IntersectionObserver((objects) => {

        objects.forEach((object) => {
            if (object.isIntersecting) {
                object.target.classList.add('animate_graph');
            }
        });

    },{threshold: 0.5});

    //go through and observe all of the elements
    for (let i = 0; i < animation_1.length; i++) {

        const elements = animation_1[i];
        observer.observe(elements);

    };

    //animation for skills graph
    $("#skills-graph").waypoint(function() {
        var bar_delay = 0;
        $(".bar-amount").each(function(){
            switch(bar_delay){
                case 0:
                    $(this).css({
                        animation: `graphbar-animation-1 0.5s forwards`,
                        'animation-delay': `${bar_delay/10}s`
                    });
                    break;
                case 1:
                case 2:
                case 3:
                    $(this).css({
                        animation: `graphbar-animation-2 0.5s forwards`,
                        'animation-delay': `${bar_delay/10}s`
                    });
                    break;
                case 4:
                case 5:
                case 6:
                case 7:
                    $(this).css({
                        animation: `graphbar-animation-3 0.5s forwards`,
                        'animation-delay': `${bar_delay/10}s`
                    });
                    break;
                case 8:
                    $(this).css({
                        animation: `graphbar-animation-4 0.5s forwards`,
                        'animation-delay': `${bar_delay/10}s`
                    });
                    break;
                case 9:
                case 10:
                    $(this).css({
                        animation: `graphbar-animation-5 0.5s forwards`,
                        'animation-delay': `${bar_delay/10}s`
                    });
                    break;
                


            }
            bar_delay += 1;
        });
    }, {offset: "60%"});

    //POSSIBLE TODO for later: put all project details/about me details
    //into JSON file and rework functions to pull from there in order
    //to have clean code. 

    //simple object definition for the three values of the about me section
    const aboutme_object = {
        "Life":`Throughout my life, I am continuously dedicated to improving my skills
                both in the form of self-improvement and providing quality 
                services to the products and projects I am involved in. 
                Whether it be running, programming, or anything else I can
                promise you that I'll do my best wherever I am involved!`,

        "Education":`In regards to my education, 
                    I have recently graduated summa cum laude from Rensselaer
                    Polytechnic Institute (RPI) with a bachelor's degree
                    in Information Technology and Web Science
                    with a concentration in web technologies. The curriculum covered
                    a wide range including backend, frontend, business communication, Human Computer Interaction (HCI),
                    Aritificial Intelligence (AI), database design, and much more. All of this leads to me being
                    very adaptable and agile when working with new concepts or topics and
                    being able to apply a wide range of perspectives to problems.
                    `,
        
        "Experience":`I might not have experience which qualifies as
                    "work" experience yet, but I certaintly do have experience through several of the projects
                    I have done that include helping businesses and organizations. Examples
                    include Bellini's counter which I was part of a team communicating between
                    client and developers for an online ordering solution and the RPI Running Club,
                    for which I delevoped and documented methods for storing race results and routes
                    on their website.`

    };

    //for each about option, replace the text in the section
    //to whatever option the user clicked.
    $(".about-option").click(function() {

        var id = $(this).attr("id");
        $("#about-desc").fadeTo(250, 0, function(){
            switch(id){
                case "life-option":
                    $("#about-desc").text(aboutme_object["Life"])
                    break;
                case "education-option":
                    $("#about-desc").text(aboutme_object["Education"])
                    break;
                case "experience-option":
                    $("#about-desc").text(aboutme_object["Experience"])
                    break;
            }
        }).delay(300).fadeTo(250,1);  

    });


    //trigger the project details box to make it 
    //fade in for the project. Most likely
    //will also include modifying contents to match project
    $(".project-box").click(function() {

        var clickedText = $(this).text();
        $("#project-title").text(clickedText);
        $.getJSON(("website-details.json"), function(data){
            $("#project-desc-text").text(data.projects[clickedText].desc);
            $("#project-skills-text").text(data.projects[clickedText].skills);
            $("#project-skills-list").empty();
            for (const item of data.projects[clickedText].skillsList){
                $("#project-skills-list").append(`<li class="project-skills-element">${item}</li>`);
            }
            if("resourceText" in data.projects[clickedText]){
                $("#project-links-list").remove();
                $("#project-links-text").remove();
                $("#project-links").append(" <p id=\"project-links-text\" class=\"details-text\"></p>")
                $("#project-links-text").text(data.projects[clickedText].resourceText);
            }
            else{
                $("#project-links-text").remove();
                $("#project-links-list").remove();
                $("#project-links").append("<ul id=\"project-links-list\"></ul>");
                for(const item of data.projects[clickedText].resources){
                    $("#project-links-list").append(`<li id="project-links-item"><a href="${item}">${item}</a></li>`);
                }
            }
            $("#project-details-cont").fadeTo(200, 1);
            $("#project-details-cont").attr('style', 'z-index:1');
        });

    })


    //just fade out the project details box for now
    $("#close-button").click(function() {
        
        $("#project-details-cont").fadeTo(200, 0, function(){
            $("#project-details-cont").attr('style', 'z-index:-1');
        });

    });

});

