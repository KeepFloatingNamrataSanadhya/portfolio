(function() {

    let pageDetails = {}

    let detailUrl = '';
    
    // Right now a tactical fix to solve the resource problem on local and server
    if(window.location.origin.indexOf('localhost') > -1 || 
        window.location.origin.indexOf('127.0.0.1') > -1) {
        detailUrl = '/pageDetails.json';
    } else {
        detailUrl = '/portfolio/pageDetails.json';
    }

    fetch(detailUrl)
    .then(response => response.json())
    .then(data => { 
        pageDetails = data;
        fillResponse(data)
    });

    function fillResponse() {
        document.getElementById("pageTitle").innerHTML = pageDetails.pageTitle;
        document.getElementById("myIntro").innerHTML = pageDetails.myIntro;
        document.getElementById("profileDescription").innerHTML = pageDetails.profileDescription;
        resetBelowContextView();
        loadProductGrid()
    }

    function resetBelowContextView() {
        let clientSectionElement = document.getElementById("clientSection")
        let serviceSectionElement = document.getElementById("serviceSection")
        let testimonialsSectionElement = document.getElementById("testimonialsSection")

        // clientSectionElement.style.display = "none";
        // serviceSectionElement.style.display = "none";
        // testimonialsSectionElement.style.display = "none";

        // setTimeout(() => {
        //     // clientSectionElement.style.display = "";
        //     // serviceSectionElement.style.display = "";
        //     // serviceSectionElement.style.display = "";
        // });
    }

    function loadProductGrid() {
        let productGridElement = document.getElementById("portfolio-grid");
        pageDetails.introTiles.forEach(tileData => {
            let productElement = buildProductTile(tileData)
            productGridElement.appendChild(productElement);
        })
    }

    function buildProductTile(tileData) {
        let productElement = document.createElement("div");
        productElement.classList.add("item",tileData.category,"col-sm-6","col-md-4","col-lg-4","mb-4");
        let anchorElement = document.createElement("a");
        anchorElement.setAttribute("href", tileData.linkedPage);
        anchorElement.classList.add("item-wrap", "fancybox");
        let innerDivElement = document.createElement("div");
        innerDivElement.classList.add("work-info");
        let headingElement = document.createElement("h3");
        headingElement.innerHTML = tileData.heading
        let subHeadingElement = document.createElement("span");
        subHeadingElement.innerHTML = tileData.subHeading;
        let imageElement = document.createElement("img");
        imageElement.classList.add("img-fluid");
        imageElement.src = tileData.imagePath;

        productElement.appendChild(anchorElement);
        anchorElement.appendChild(innerDivElement);
        anchorElement.appendChild(imageElement);
        innerDivElement.appendChild(headingElement);
        innerDivElement.appendChild(subHeadingElement);

        return productElement;
    }

})();