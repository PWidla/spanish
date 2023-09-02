const answerInput = document.getElementById('answer');
const showButton = document.getElementById('showAnswersBtn');
const dataContainer = document.getElementById('dataContainer');
const valuesArray = [];
let rowNumber = 0;

// Ścieżka do pliku CSV
const csvFilePath = 'csvs/'+document.title+'.csv'; // Zmień na odpowiednią ścieżkę do swojego pliku CSV

// Funkcja do wczytywania i wyświetlania danych
function displayCSVData(csvData) {
    const rows = csvData.split('\n');
    const table = document.createElement('table');

    rows.forEach(rowData => {
        rowNumber++;
        const row = document.createElement('tr');
        row.id = "row" + rowNumber;
        const cellData = rowData.split(',');

        cellData.forEach((cellText, index) => {
            const cell = document.createElement('td');

            if (index === 0) {
                cell.classList.add('polish');
            } else {
                cell.classList.add('spanish');
            }

            if (index === 1) {
                valuesArray.push(cellText);
            }

            cell.textContent = cellText;
            row.appendChild(cell);
        });

        table.appendChild(row);
    });

    const headerRow = table.querySelector('#row1');
    const headerCells = headerRow.querySelectorAll('td');
    headerCells.forEach(cell => {
        cell.classList.remove('spanish');
    });

    dataContainer.appendChild(table);
}

// Wczytaj plik CSV i wyświetl dane na stronie
fetch(csvFilePath)
    .then(response => response.text())
    .then(data => {
        displayCSVData(data);
    })
    .catch(error => {
        console.error('Błąd podczas wczytywania pliku CSV:', error);
    });


answerInput.addEventListener('input', function () {
    const answer = answerInput.value.trim().toLowerCase();
    const cells = document.querySelectorAll('.spanish');

    cells.forEach(cell => {
        if (cell.textContent.trim().toLowerCase() === answer) {
            const parentRow = cell.parentElement;
            const cellsInRow = parentRow.querySelectorAll('td');

            cellsInRow.forEach(cellInRow => {
                cellInRow.classList.remove('spanish');
                cellInRow.classList.add('correct');
            })

            answerInput.value = '';
        }
    });
});

showAnswersBtn.addEventListener('click', function () {
    const spanishCells = document.querySelectorAll('.spanish');

    spanishCells.forEach(cell => {
        cell.classList.remove('spanish');
    });
})