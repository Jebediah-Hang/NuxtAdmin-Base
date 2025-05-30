export function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader: FileReader = new FileReader();

    reader.onload = () => {
      resolve(<string>reader.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}

export function fillNumberZero(num: number): string {
  return `${num >= 0 && num < 10 ? '0' : ''}${num}`;
}
