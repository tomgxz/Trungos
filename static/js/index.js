gsap.registerPlugin(ScrollTrigger)

function updateImages() {
    document.querySelectorAll(".image-fadethru-container .image-fadethru-tocheck").forEach((e)=>{
        var parent = e.parentElement
        var original = e.parentElement.querySelector(".image-fadethru")
        var imageBounds = original.getBoundingClientRect()
        var parentBounds = parent.getBoundingClientRect()
    
        var imageRelativeBounds = {
            y:imageBounds.x-parentBounds.x,
            x:imageBounds.y-parentBounds.y,
            w:imageBounds.width,
            h:imageBounds.height
        }
    
        e.style.position = "absolute"
        e.style.top = imageRelativeBounds.x+"px"
        e.style.left = imageRelativeBounds.y+"px"
        e.style.width = imageRelativeBounds.w+"px"
        e.style.height = imageRelativeBounds.h+"px"
        e.classList.remove("w-100")
        e.classList.remove("image-fadethru")
        e.classList.add("image-fadethru-tocheck")
    
    })
}

function createImage(e) {
    var parent = e.parentElement
    var imageBounds = e.getBoundingClientRect()
    var parentBounds = parent.getBoundingClientRect()

    var imageRelativeBounds = {
        y:imageBounds.x-parentBounds.x,
        x:imageBounds.y-parentBounds.y,
        w:imageBounds.width,
        h:imageBounds.height
    }

    console.log(imageRelativeBounds)

    var newImage = e.cloneNode()
    newImage.style.position = "absolute"
    newImage.style.top = imageRelativeBounds.x+"px"
    newImage.style.left = imageRelativeBounds.y+"px"
    newImage.style.width = imageRelativeBounds.w+"px"
    newImage.style.height = imageRelativeBounds.h+"px"
    newImage.style.visibility = "visible"
    newImage.style.opacity = "1"
    newImage.classList.remove("w-100")
    newImage.classList.remove("image-fadethru")
    newImage.classList.add("image-fadethru-tocheck")
    
    parent.style.position = "relative"

    e.style.visibility = "hidden"
    e.style.opacity = "0"

    var newImage2 = newImage.cloneNode()
    newImage2.style.visibility = "hidden"
    newImage2.style.opacity = "0"
    newImage2.setAttribute("aria-hidden","true")

    parent.appendChild(newImage)
    parent.appendChild(newImage2)

    setInterval(createImageFade.bind(null,newImage,newImage2),3500)
}

function createImageFade(img1,img2) {
    var urls = img1.getAttribute("data-fadethru-images").split(",")
    var img1visible = img1.style.visibility == "visible" || img1.style.visibility == "inherit"
    var current

    if (img1visible) current = urls.indexOf(img1.getAttribute("src"))
    else current = urls.indexOf(img2.getAttribute("src"))

    if (current+1 == urls.length) current=-1

    if (img1visible) img2.setAttribute("src",urls[current+1])
    else img1.setAttribute("src",urls[current+1])

    if (img1visible) {
        gsap.to(img2,{autoAlpha:1,duration:1,ease:"power1.easeInOut",onStart:img2.removeAttribute("aria-hidden")})
        gsap.to(img1,{autoAlpha:0,duration:1,ease:"power1.easeInOut",onComplete:img1.setAttribute("aria-hidden","true")})
    } else {
        gsap.to(img1,{autoAlpha:1,duration:1,ease:"power1.easeInOut",onStart:img1.removeAttribute("aria-hidden")})
        gsap.to(img2,{autoAlpha:0,duration:1,ease:"power1.easeInOut",onComplete:img2.setAttribute("aria-hidden","true")})
    }
}

function createImages() {
    document.querySelectorAll(".image-fadethru-container .image-fadethru").forEach(createImage)
    addEventListener("resize",updateImages)
}

createImages()

gsap.fromTo("#about-us .column-fadein",{autoAlpha:0,y:50},{
    css: {
        autoAlpha:1,
        y:0,
    },
    scrollTrigger: {
        trigger:"#about-us",
        start:"top bottom",
        end:"bottom bottom",
        scrub:true,
    },
    stagger: {
        amount:0.5,
    }
})

gsap.fromTo("#reviews-1 .column-fadein",{autoAlpha:0,y:25},{
    css: {
        autoAlpha:1,
        y:0,
    },
    scrollTrigger: {
        trigger:"#reviews-1",
        start:"top+=50px bottom",
        end:"bottom+=350px bottom",
        scrub:true,
    },
    stagger: {
        amount:.3,
        from:"start",
    }
})

gsap.fromTo("#menu .column-fadein",{autoAlpha:0,y:50},{
    css: {
        autoAlpha:1,
        y:0,
    },
    scrollTrigger: {
        trigger:"#menu",
        start:"top+=150 bottom",
        end:"bottom+=150 bottom",
        scrub:true,
    },
    stagger: {
        amount:0.3,
    }
})
