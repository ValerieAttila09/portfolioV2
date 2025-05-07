// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    let masterTl = gsap.timeline({
        scrollTrigger: {
            end: "+=1080 0px",
            scrub: true,
            pin: "#boxWrap",
            //markers: true,
        }
    })

    const animationStart = () => {
        return gsap.timeline().to("#introImage", {
            //filter: "blur(1.5px)",
            opacity: 0,
            y: "-2rem",
            scale: 1,
        }).to("#name1", {
            scale: 0.4,
            y: "2rem",
            x: "200%",
        }, "-=0.5").to("#name2", {
            scale: 3,
            y: "2rem",
        }, "-=0.5").to("#name3", {
            scale: 0.4,
            y: "2rem",
            x: "-200%",
        }, "-=0.5")
    }

    let beginAnimation = masterTl.add(animationStart());




    // CARAOUSEL

    let count = 0;
    const targets = document.querySelectorAll(".box");
    const slides = document.querySelectorAll(".slide");

    gsap.set(targets, {
        xPercent: 100,
        autoAlpha: 0
    });

    gsap.set(targets[0], {
        xPercent: 0,
        autoAlpha: 1,
        zIndex: 1
    });

    gsap.set(slides, {
        backgroundColor: "#929AAB",
    })

    gsap.set(slides[0], {
        backgroundColor: "#19191A",
    });


    function slideTo(index, direction = "next") {
        const current = targets[count];
        const next = targets[index];
        const outX = direction === "next" ? -100: 100;
        const inX = direction === "next" ? 100: -100;

        const currentSlide = slides[count];
        const nextSlide = slides[index];
        const active = "#19191A";



        // Slide keluar
        gsap.to(current, {
            duration: 0.6,
            xPercent: outX,
            autoAlpha: 0,
            zIndex: 0,
            ease: "power2.inOut"
        });

        gsap.to(currentSlide, {
            backgroundColor: "#929AAB",
        })

        count = index;

        // Slide masuk
        gsap.fromTo(next, {
            xPercent: inX,
            autoAlpha: 0,
            zIndex: 1
        }, {
            duration: 0.6,
            xPercent: 0,
            autoAlpha: 1,
            ease: "power2.inOut"
        });

        gsap.fromTo(nextSlide, {
            backgroundColor: "#929AAB",
        }, {
            backgroundColor: active,
        })
    }

    // Tombol Next
    document.getElementById("nextButton").addEventListener("click", () => {
        const nextIndex = (count + 1) % targets.length;
        slideTo(nextIndex, "next");
    });

    // Tombol Prev
    document.getElementById("prevButton").addEventListener("click", () => {
        const prevIndex = (count - 1 + targets.length) % targets.length;
        slideTo(prevIndex, "prev");
    });



    // TIMELINES

    let countTimeline = 0;
    const timelines = document.querySelectorAll(".sekolah");

    gsap.set(timelines, {
        xPercent: 100,
        autoAlpha: 0
    });

    gsap.set(timelines[0], {
        xPercent: 0,
        zIndex: 1,
        autoAlpha: 1
    });

    const nextButtonTimeline = document.getElementById("nextTimeline");
    nextButtonTimeline.addEventListener("click",
        () => {
            if (countTimeline < timelines.length - 1) {
                const nextTimeline = countTimeline + 1;
                timeSlide(nextTimeline, "next");
            }
        });

    const prevButtonTimeline = document.getElementById("prevTimeline");
    prevButtonTimeline.addEventListener("click",
        () => {
            if (countTimeline > 0) {
                const prevTimeline = countTimeline - 1;
                timeSlide(prevTimeline, "prev");
            }
        });

    function updateTimelineButtons() {
        // Next button
        if (countTimeline === timelines.length - 1) {
            nextButtonTimeline.disabled = true;
            nextButtonTimeline.classList.add("bg-greyLight");
        } else {
            nextButtonTimeline.disabled = false;
            nextButtonTimeline.classList.remove("bg-greyLight");
        }

        // Prev button
        if (countTimeline === 0) {
            prevButtonTimeline.disabled = true;
            prevButtonTimeline.classList.add("bg-greyLight");
        } else {
            prevButtonTimeline.disabled = false;
            prevButtonTimeline.classList.remove("bg-greyLight");
        }


        if (countTimeline === 0) {
            seperempat();
        } else if (countTimeline === 1) {
            setengah();
        } else if (countTimeline === 2) {
            tigaperempat();
        } else if (countTimeline === 3) {
            full();
        } else {
            console.error("Error!");
        }
    }
    
    function seperempat() {
        const lebar = document.getElementById('timelineProgress');
        gsap.to(lebar, {
            width: "10%",
        });
    }

    function setengah() {
        const lebar = document.getElementById('timelineProgress');
        gsap.to(lebar, {
            width: "40%",
        });
    }

    function tigaperempat() {
        const lebar = document.getElementById('timelineProgress');
        gsap.to(lebar, {
            width: "70%",
        });
    }

    function full() {
        const lebar = document.getElementById('timelineProgress');
        gsap.to(lebar, {
            width: "100%",
        });
    }

    function timeSlide(index, direction = "next") {
        const currentTimeline = timelines[countTimeline];
        const nextTimeline = timelines[index];
        const outXTimeline = direction === "next" ? -100: 100;
        const inXTimeline = direction === "next" ? 100: -100;


        // Slide keluar
        gsap.to(currentTimeline,
            {
                duration: 0.5,
                xPercent: outXTimeline,
                autoAlpha: 0,
                zIndex: 0,
                ease: "power2.inOut"
            });

        countTimeline = index;

        // Slide masuk
        gsap.fromTo(nextTimeline,
            {
                xPercent: inXTimeline,
                autoAlpha: 0,
                zIndex: 1
            },
            {
                duration: 0.5,
                xPercent: 0,
                autoAlpha: 1,
                ease: "power2.inOut"
            });

        updateTimelineButtons();
    }

});


// JSON DATA

function getData() {
    fetch("data/projects.json")
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("fetchData");

        data.forEach(fetched => {
            container.insertAdjacentHTML("beforeend", `
                <div class="relative w-full h-[360px] overflow-hidden rounded-lg bg-dark border border-dark">
                <img class="bg-dark relative w-full h-full object-cover brightness-120 saturate-70" src="src/img/${fetched.path}" alt="" />

                <div class="absolute z-10 top-0 left-0 p-3">
                <h1 class="text-6xl text-light didact-gothic-bold">${fetched.nama}</h1>
                </div>

                <div class="absolute w-full h-full bottom-0 left-0 right-0 top-0 bg-radial from-transparent from-12% to-dark"></div>

                <div class="absolute left-0 bottom-[52px] p-4">
                <span class="text-secondaryLight text-md didact-gothic-medium">${fetched.description}</span>
                </div>

                <div class="absolute left-0 bottom-0 p-4">
                <button class="w-full bg-dark py-2 px-8 rounded-lg text-center text-light text-lg didact-gothic-bold border-2 border-transparent focus:border-dark focus:bg-light focus:text-dark focus:shadow-lg hover:shadow-md hover:bg-neutral-400 hover:border-transparent transition-all" type="button">See More</button>
                </div>
                </div>
                `);
        })
    })
    .catch(error => {
        console.error("ERROR! Cannot fetch Data! \n",
            error);
    });
}

getData();