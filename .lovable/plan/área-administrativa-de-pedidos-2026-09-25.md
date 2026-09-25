# Área administrativa de pedidos

## Objetivo
Criar uma área exclusiva para Luciana consultar e administrar os pedidos recebidos pelo formulário público, sem cadastro público de novas contas.

## Implementação
- Habilitar acesso por e-mail e senha e manter o cadastro público desativado.
- Criar `/admin/login` com formulário de entrada e mensagens claras de erro.
- Criar `/admin` como área protegida, redirecionando visitantes sem sessão para o login.
- Adicionar o status `novo`, `contatado`, `relatorio_enviado` ou `concluido` a cada pedido, com `novo` como padrão.
- Manter pedidos invisíveis ao público e permitir leitura, edição e exclusão apenas para usuários autenticados.
- Preservar o envio do formulário público pelo fluxo seguro já existente.
- Exibir os pedidos em tabela com busca por nome/e-mail, período de envio e alteração rápida de status.
- Abrir todos os dados do pedido em uma janela de detalhes, com edição completa e confirmação antes da exclusão.
- Incluir encerramento de sessão e estados de carregamento, vazio, sucesso e erro.
- Atualizar a versão para `1.5.4` nos três pontos obrigatórios.

## Detalhes técnicos
- Usar a autenticação e as políticas do backend para aplicar a proteção, não apenas controles visuais.
- Colocar as páginas protegidas sob a estrutura autenticada do TanStack Router.
- Validar alterações no navegador e no servidor antes de salvar.
- Validar login, filtros, detalhes, edição, status, exclusão e saída em desktop e celular.
