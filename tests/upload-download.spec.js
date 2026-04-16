import ExcelJs from 'exceljs';
import { test, expect } from '@playwright/test';

async function writeExcelTest(searchText, replaceText, change, filePath){
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = readExcel(worksheet, searchText);
    const cell = worksheet.getCell(output.row, output.column+change.columnChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath); 
}

function readExcel(worksheet, searchText){
    let output = {row: -1, column: -1};
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, columnNumber) => {
            if(cell.value === searchText){
                output.row = rowNumber;
                output.column = columnNumber;
            }
        });
    });
    return output;
}

test('upload download excel validations', async({page}) => {
    const textSearch = "Mango";
    const updatedValue = "350";
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    await downloadPromise;
    await  writeExcelTest(textSearch, updatedValue, {rowChange:0, columnChange:2}, "C:\\Users\\vikus\\data.xlsx");
    await page.locator('#fileinput').setInputFiles("C:\\Users\\vikus\\data.xlsx");
    const textLocator = page.getByText(textSearch);
    const desiredRow = page.getByRole('row').filter({has: textLocator})
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updatedValue);
});