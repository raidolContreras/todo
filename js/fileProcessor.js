function processFile(file, $todosContainer) {
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      if (file.name.endsWith(".csv")) {
        const csv = e.target.result;
        const lines = csv
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line);
        lines.forEach((line) => $todosContainer.append(createTodoItem(line)));
      } else if (file.name.endsWith(".xlsx")) {
        const workbook = XLSX.read(new Uint8Array(e.target.result), {
          type: "array",
        });
        const firstSheetName = workbook.SheetNames[0];
        const jsonData = XLSX.utils.sheet_to_json(
          workbook.Sheets[firstSheetName],
          { header: 1 }
        );
        jsonData.forEach(
          (row) => row[0] && $todosContainer.append(createTodoItem(row[0]))
        );
      }
      saveLists(window.username);
    } catch (error) {
      console.error("Error procesando el archivo:", error);
    }
  };

  reader.onerror = function () {
    console.error("Error leyendo el archivo:", reader.error);
  };

  if (file.name.endsWith(".csv")) {
    reader.readAsText(file);
  } else if (file.name.endsWith(".xlsx")) {
    reader.readAsArrayBuffer(file);
  }
}
