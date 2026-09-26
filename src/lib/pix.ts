// Monta o código Pix "copia e cola" (BR Code / EMV) para um Pix estático.
// Referência: manual de padrões para iniciação do Pix (Bacen).

function montarCampo(id: string, valor: string): string {
  const tamanho = valor.length.toString().padStart(2, "0");
  return `${id}${tamanho}${valor}`;
}

function calcularCrc16(payload: string): string {
  const polinomio = 0x1021;
  let resultado = 0xffff;

  for (let i = 0; i < payload.length; i += 1) {
    resultado ^= payload.charCodeAt(i) << 8;
    for (let bit = 0; bit < 8; bit += 1) {
      resultado =
        (resultado & 0x8000) !== 0
          ? ((resultado << 1) ^ polinomio) & 0xffff
          : (resultado << 1) & 0xffff;
    }
  }

  return resultado.toString(16).toUpperCase().padStart(4, "0");
}

export type DadosPixEstatico = {
  chave: string;
  nomeRecebedor: string;
  cidadeRecebedor: string;
  valor: string;
  identificador?: string;
};

export function gerarPixCopiaECola({
  chave,
  nomeRecebedor,
  cidadeRecebedor,
  valor,
  identificador = "***",
}: DadosPixEstatico): string {
  const merchantAccountInformation = montarCampo("00", "br.gov.bcb.pix") + montarCampo("01", chave);

  const additionalDataField = montarCampo("05", identificador);

  const payloadSemCrc =
    montarCampo("00", "01") +
    montarCampo("26", merchantAccountInformation) +
    montarCampo("52", "0000") +
    montarCampo("53", "986") +
    montarCampo("54", valor) +
    montarCampo("58", "BR") +
    montarCampo("59", nomeRecebedor.slice(0, 25)) +
    montarCampo("60", cidadeRecebedor.slice(0, 15)) +
    montarCampo("62", additionalDataField) +
    "6304";

  return payloadSemCrc + calcularCrc16(payloadSemCrc);
}
