function processFile(file, $todosContainer) {
    const reader = new FileReader();
    reader.onload = function (e) {
        if (file.name.endsWith('.csv')) {
            const csv = e.target.result;
            const lines = csv.split('\n');
            lines.forEach(line => {
                const trimmedLine = line.trim();
                if (trimmedLine) {
                    $todosContainer.append(createTodoItem(trimmedLine));
                }
            });
        } else if (file.name.endsWith('.xlsx')) {
            const workbook = XLSX.read(e.target.result, { type: 'binary' });
            const firstSheetName = workbook.SheetNames[0];
            const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], { header: 1 });
            jsonData.forEach(row => {
                if (row[0]) {
                    $todosContainer.append(createTodoItem(row[0]));
                }
            });
        }
        // Se guarda el estado de las listas tras procesar el archivo
        saveLists(window.username);
    };
    if (file.name.endsWith('.csv')) {
        reader.readAsText(file);
    } else if (file.name.endsWith('.xlsx')) {
        reader.readAsBinaryString(file);
    }
}

function handleFileSelection(files, $todosContainer) {
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.name.endsWith('.csv') || file.name.endsWith('.xlsx')) {
            processFile(file, $todosContainer);
        } else {
            alert('Solo se permiten archivos CSV o XLSX');
        }
    }
}
