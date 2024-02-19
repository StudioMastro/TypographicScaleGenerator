document.addEventListener('DOMContentLoaded', function() {
    loadGoogleFonts();

    // Aggiungi qui altri event listener, se necessario
});

function loadGoogleFonts() {
    const apiKey = 'AIzaSyCxA6Be24-4GVhL_qexz555ifrq-M0l15Y';
    const url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=alpha`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const fontSelector = document.getElementById('fontSelector');
        // Ordinamento alfabeticamente i font
        const fonts = data.items.sort((a, b) => a.family.localeCompare(b.family));
        fonts.forEach(font => {
            const option = document.createElement('option');
            option.value = font.family;
            option.innerText = font.family;
            option.style.fontFamily = font.family;
            fontSelector.appendChild(option);
            
            // Caricare l'anteprima del font per l'opzione corrente
            const fontLink = document.createElement('link');
            fontLink.href = `https://fonts.googleapis.com/css?family=${font.family.replace(/ /g, '+')}:400`;
            fontLink.rel = 'stylesheet';
            document.head.appendChild(fontLink);
        });
    })
    .catch(error => {
        console.error('Error loading Google Fonts:', error);
    });
}

document.getElementById('baseSize').addEventListener('input', function() {
    updatePreview();
});

document.getElementById('fontSelector').addEventListener('change', function() {
    const fontName = this.value;
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css?family=${fontName.replace(/ /g, '+')}:400,700`;
    link.rel = 'stylesheet';

    document.head.appendChild(link);
    document.getElementById('preview').style.fontFamily = `"${fontName}", sans-serif`;
    updatePreview();
});

document.getElementById('previewText').addEventListener('input', function() {
    document.getElementById('preview').innerText = this.value || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
});

function updatePreview() {
    const newSize = document.getElementById('baseSize').value + 'px';
    document.getElementById('preview').style.fontSize = newSize;
}

document.getElementById('scaleSelector').addEventListener('change', function() {
    applyTypographyScale();
});

function applyTypographyScale() {
    const selectedScale = parseFloat(document.getElementById('scaleSelector').value);
    const baseSize = parseInt(document.getElementById('baseSize').value, 10);
    const previewElement = document.getElementById('preview');

    // Qui applicheremo il moltiplicatore alla dimensione del font di base
    // e aggiorneremo l'area di anteprima. Ad esempio, il font-size per h1 potrebbe essere baseSize * selectedScale
    previewElement.style.fontSize = `${baseSize * selectedScale}px`;

    // Dovrai aggiungere la logica per aggiornare altri elementi del testo di anteprima come h2, h3, ecc.
    // seguendo la scala tipografica selezionata.
}

// Assicurati di chiamare applyTypographyScale anche quando si aggiorna la dimensione del font di base
document.getElementById('baseSize').addEventListener('input', function() {
    applyTypographyScale();
});

