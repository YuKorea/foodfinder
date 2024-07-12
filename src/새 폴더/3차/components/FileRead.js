// FileRead.js
import React, { useEffect, useState } from "react";

function FileRead({ onDataLoad }) {
  useEffect(() => {
    fetch("/data/test3.csv")
      .then((response) => response.text())
      .then((csv) => {
        const lines = csv.split('\r\n');
        const result = [];
        const headers = lines[0].split(",");

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].split(",");
          if (line.length === headers.length) {
            const item = {};
            headers.forEach((header, index) => {
              item[header] = line[index];
            });
            result.push(item);
          }
        }

        onDataLoad(result);
      });
  }, [onDataLoad]);

  return (
    <div>
      <h3>CSV 파일을 읽기</h3>
      <p>CSV 데이터를 로드 중입니다...</p>
    </div>
  );
}

export default FileRead;
