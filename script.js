let lastSelectedOption = 'ab';

document.addEventListener('DOMContentLoaded', function () {

    const abButton = document.getElementById("ab");
    switchSection("abSection");
    abButton.classList.add('pressed')


    // Load all the base64 images
    function addImage(className, image, h, w) {
        const elements = document.querySelectorAll(className);
        elements.forEach(element => {
            element.innerHTML = `<img height='${h}' width='${w}' src='${image}'>`;
        });
    }

    addImage('.abLogoImage', abLogoImage, '35', '120');
    addImage('.acLogoImage', acLogoImage, '35', '120');
    addImage('.ainslieLogoImage', ainslieLogoImage, '30', '120');
    addImage('.tmvLogoImage', tmvLogoImage, '80', '125');
    addImage('.tmvFbImage', tmvFbImage, '17', '17');
    addImage('.tmvLnImage', tmvLnImage, '17', '17');
    addImage('.tmvGImage', tmvGImage, '17', '17');
    addImage('.tmvXImage', tmvXImage, '17', '17');
    addImage('.asialImage', asialImage, '', '400');
    addImage('.ainslieSigLogo', ainslieSigLogo, '45', '160');
    addImage('.abSigLogo', abSigLogo, '45', '160');
    addImage('.acSigLogo', acSigLogo, '45', '160');
    addImage('.abFbImage', abFbImage, '', '');
    addImage('.abIgImage', abIgImage, '', '');
    addImage('.abLnImage', abLnImage, '', '');
    addImage('.abXImage', abXImage, '', '');
    addImage('.abYtImage', abYtImage, '', '');
    addImage('.ab50yrImage', ab50yrImage, '139', '420');
    addImage('.rvSpacer', rvSpacer, '13', '16');
    addImage('.rvLogoImage', rvLogoImage, '80', '250');
    addImage('.rvFbImage', rvFbImage, '17', '17');
    addImage('.rvLnImage', rvLnImage, '17', '17');
    addImage('.rvGImage', rvGImage, '17', '17');
});


// Reset the form
function reset() {
    location.reload();
}


// Hide/show sections based on button press
function switchSection(sectionId) {
    console.log('sectionId: ', sectionId);
    // Hide all sections
    document.getElementById('abSection').style.display = 'none';
    document.getElementById('rvSection').style.display = 'none';
    document.getElementById('tmvSection').style.display = 'none';

    document.getElementById(sectionId).style.display = 'block';

    const logoSection = document.querySelector('.logo-section');
    if (sectionId === 'abSection') {
        logoSection.style.display = 'flex';
    } else {
        logoSection.style.display = 'none';
    }

    const officeSection = document.querySelector('.officeSelection');
    if (sectionId !== 'abSection') {
        officeSection.style.display = 'none';
    } else {
        officeSection.style.display = 'flex';
    }

    // Clear input fields
    var inputClassList = ['inputName', 'inputRole', 'inputEmail', 'inputMobile', 'inputPhone', 'inputPersonalLink'];
    inputClassList.forEach(function (inputClass) {
        var inputElements = document.getElementsByClassName(inputClass);
        Array.from(inputElements).forEach(function (inputElement) {
            inputElement.value = '';
        });
    });
}


/**
* Updates the selected option and switches the displayed section.
*
* When a button is clicked, this function updates the global
* lastSelectedOption variable to the clicked button's value.
*
* It then removes the .pressed class from all option buttons, and
* adds the .pressed class to the clicked button.
*
* Finally, it constructs a section ID from the button value and
* calls switchSection() to show the corresponding section.
*/
function setSelectedOption(clickedButton) {

    lastSelectedOption = clickedButton.value.toLowerCase();
    console.log(lastSelectedOption);
    console.log("lastSelectedOption: ", lastSelectedOption)
    document.getElementById('copyBtn').style.display = 'block';

    document.querySelectorAll('button[name="option"]').forEach(button => {
        button.classList.remove('pressed');
    });

    clickedButton.classList.add('pressed');

    const sectionId = lastSelectedOption + 'Section';
    switchSection(sectionId);
}

/**
* Adds a click event listener to the copy button that copies the content
* of the currently selected option's section to the clipboard.
*
* It first checks that an option has been selected, then constructs the
* ID of the section to copy based on the selected option. It then uses
* document.execCommand('copy') to copy the content to the clipboard.
*
* It shows a notification when copied successfully.
*/
document.getElementById('copyBtn').addEventListener('click', function () {
    const selectedOption = lastSelectedOption;
    console.log(selectedOption);

    if (!selectedOption) {
        console.error('No option selected.');
        return;
    }

    const contentToCopyId = selectedOption + 'SectionCopy';
    const contentToCopy = document.getElementById(contentToCopyId);

    console.log("contentToCopyId: ", contentToCopyId)
    console.log("contentToCopy: ", contentToCopy)

    if (window.getSelection && document.createRange) {
        const selection = window.getSelection();
        selection.removeAllRanges();

        const range = document.createRange();
        console.log("range: ", range)

        range.selectNodeContents(contentToCopy);
        selection.addRange(range);

        console.log("range.selectNodeContents(contentToCopy) ", range.selectNodeContents(contentToCopy))

        try {
            document.execCommand('copy');
            const notification = document.getElementById('copyNotification');
            notification.style.display = 'block';

            fadeIn(notification, () => {
                setTimeout(() => {
                    fadeOut(notification, () => {
                    });
                }, 2000);
            });
        } catch (err) {
            console.error('Failed to copy content: ', err);
        }

        selection.removeAllRanges();
    } else {
        console.error('Your browser does not support this copy method.');
    }
});


/**
* Adds focus and blur event listeners to all input elements
* to update their border color.
* Focusing an input will set its border color to blue.
* Blurring an input will set its border color to gray.
*/
document.querySelectorAll('input').forEach(input => {
    input.onfocus = function () {
        this.style.borderColor = '#007bff';
    };
    input.onblur = function () {
        this.style.borderColor = '#ccc';
    };
});

/**
* Adds event listeners to update the display elements when inputs change.
*
* On DOM load, sets up:
* - Input listeners on name, role, email, mobile, phone inputs
* - Update functions to update display elements or links
* - Listener on each input to call the corresponding update function
*
* The updateDisplayElement function updates a display element by class name.
*
* The updateLinkFromInput function updates link href and text based on an
* input value, by link class name. It can clean/format the input value before
* setting the link.
*
* So on each input change:
* - name and role update the display name and role elements
* - email, mobile, phone call updateLinkFromInput to update the
* corresponding link
*/
document.addEventListener('DOMContentLoaded', function () {
    function updateDisplayElement(elementClass, value) {
        console.log("updateDisplayElement function. Element class:", elementClass, "value:", value);
        console.log(lastSelectedOption, "LastSelectedOption");

        const sectionElement = document.getElementById(lastSelectedOption + 'Section');
        console.log("sectionElement:", sectionElement);

        if (sectionElement) {
            const elements = sectionElement.getElementsByClassName(elementClass);
            console.log(`#${lastSelectedOption}Section .${elementClass}`);

            if (elements.length > 0) {
                elements[0].innerHTML = value;
                console.log("Updated element:", elements[0]);
            } else {
                console.log("No elements found with class:", elementClass);
            }
        } else {
            console.log("Section element not found");
        }
    }

    function updateLinkFromInput(inputId, linkClass, prefix, cleanUpFunction = value => value) {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', function () {
                const inputValue = this.value;
                const cleanedInputValue = cleanUpFunction(inputValue);
                const linkElements = document.querySelectorAll(`#${lastSelectedOption}Section .${linkClass}`);
                linkElements.forEach(linkElement => {
                    linkElement.style.display = inputValue.trim() ? '' : 'none';
                    linkElement.href = prefix + cleanedInputValue;
                    linkElement.textContent = inputValue;
                });
            });
        }
    }


    const inputs = ['name', 'role', 'mobileInput', 'phoneInput', 'personalLink'];
    const updateFunctions = {
        'name': value => updateDisplayElement('displayName', `${value}`),
        'role': value => updateDisplayElement('displayRole', `<strong>${value}</strong>`),
        'mobileInput': value => updateLinkFromInput('mobileInput', 'mobileLink', 'tel:', value => value.replace(/ +/g, "")),
        'phoneInput': value => updateLinkFromInput('phoneInput', 'phoneLink', 'tel:', value => value.replace(/ +/g, "")),
        'personalLink': value => updateLinkFromInput('personalLink', 'personalLink', 'https://', value => value.replace(/ +/g, ""))
    };

    inputs.forEach(inputId => {
        document.getElementById(inputId).addEventListener('input', function () {
            if (inputId === 'name' || inputId === 'role') {
                updateFunctions[inputId](this.value);
            } else {
                updateFunctions[inputId]();
            }
        });
    });
});


// Ainslie Logo Selection
function imageClicked(clickedLogoClass) {
    const allTargetLogos = document.querySelectorAll('span[data-target-logo]');
    const abWebsite = document.querySelector('.abwebsite');
    const acWebsite = document.querySelector('.acwebsite');
    const facebookLink = document.querySelector('.abfb');
    const xLink = document.querySelector('.abx');
    const igLink = document.querySelector('.abig');

    allTargetLogos.forEach(targetLogo => {
        if (targetLogo.getAttribute('data-target-logo') === clickedLogoClass) {
            targetLogo.style.display = 'block';
        } else {
            targetLogo.style.display = 'none';
        }
    });

    // Toggle website visibility based on clicked logo
    if (clickedLogoClass === 'acLogo') {
        abWebsite.style.display = 'none';
        acWebsite.style.display = 'inline';
        facebookLink.href = 'https://www.facebook.com/ainsliecrypto.com.au';
        xLink.href = 'https://twitter.com/AinslieCrypto';
        igLink.href = 'https://www.instagram.com/ainsliecrypto';
    } else {
        abWebsite.style.display = 'inline';
        acWebsite.style.display = 'none';
        facebookLink.href = 'https://www.facebook.com/AinslieBullion/';
        xLink.href = 'https://twitter.com/AinslieBullion';
        igLink.href = 'https://www.instagram.com/ainsliebullion/';
    }
}

// Ainslie Office Selection
function officeSelected(selectedOffice) {
    document.querySelectorAll('.officeBrisbane1, .officeBrisbane2, .officeBrisbane3, .officeMelb1, .officeMelb2, .officeMelb3').forEach(element => {
        element.style.display = 'none';
    });

    if (selectedOffice === 'Brisbane') {
        document.querySelectorAll('.officeBrisbane1, .officeBrisbane2, .officeBrisbane3').forEach(element => {
            element.style.display = '';
        });
    }
    else if (selectedOffice === 'Melbourne') {
        document.querySelectorAll('.officeMelb1, .officeMelb2, .officeMelb3').forEach(element => {
            element.style.display = '';
        });
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const initialOffice = document.getElementById('inputOffice').value;
    officeSelected(initialOffice);
});


// hectic js to simply hide and show the mobile phone number ( *~*)
document.addEventListener('DOMContentLoaded', function () {
    const toggleMobile = document.getElementById('toggleMobile');
    let office = document.getElementById('inputOffice').value
    let initialMobileAdjacentContent = document.getElementById('mobileRow').cells[1].innerHTML;
    let initialTelephoneAdjacentContent = document.getElementById('telephoneRow').cells[1].innerHTML;
    let initialTollFreeAdjacentContent = document.getElementById('tollFreeRow').cells[1].innerHTML;

    console.log("office: ", office);
    console.log(initialMobileAdjacentContent)
    console.log(initialTelephoneAdjacentContent)
    console.log(initialTollFreeAdjacentContent);

    toggleMobile.addEventListener('change', function () {
        let office = document.getElementById('inputOffice').value;
        if (this.checked) {
            document.getElementById('mobileRow').style.display = '';
            document.getElementById('mobileRow').cells[1].innerHTML = initialMobileAdjacentContent;
            document.getElementById('telephoneRow').style.display = '';
            document.getElementById('telephoneRow').cells[1].innerHTML = initialTelephoneAdjacentContent;
            document.getElementById('tollFreeRow').style.display = '';
            document.getElementById('tollFreeRow').cells[1].innerHTML = initialTollFreeAdjacentContent;
            let websiteRow = document.getElementById('websiteRow');
            if (websiteRow.cells.length > 1) {
                websiteRow.deleteCell(1);
            }

            document.getElementById('mobileRowtmv').style.display = '';
            document.getElementById('mobileRowRv').style.display = '';

        } else {
            document.getElementById('mobileRow').style.display = 'none';
            document.getElementById('telephoneRow').cells[1].innerHTML = initialMobileAdjacentContent;
            document.getElementById('tollFreeRow').cells[1].innerHTML = initialTelephoneAdjacentContent;

            let websiteRow = document.getElementById('websiteRow');
            if (websiteRow.cells.length < 2) {
                let newCell = websiteRow.insertCell(1);
                newCell.innerHTML = initialTollFreeAdjacentContent;
                newCell.colSpan = 5;
                newCell.style.fontFamily = "Arial, Helvetica, sans-serif";
                newCell.style.fontSize = "13px";
            }
            document.getElementById('mobileRowtmv').style.display = 'none';
            document.getElementById('mobileRowRv').style.display = 'none';
        }
        officeSelected(office);
    });
});

function fadeIn(element, callback = () => { }) {
    element.style.opacity = 0;
    element.style.display = 'flex';
    setTimeout(() => {
        element.style.transition = 'opacity 1s';
        element.style.opacity = 1;
        setTimeout(callback, 1000);
    }, 10);
}

function fadeOut(element, callback = () => { }) {
    element.style.transition = 'opacity 1s';
    element.style.opacity = 0;
    setTimeout(() => {
        element.style.display = 'none';
        callback();
    }, 1000);
}
