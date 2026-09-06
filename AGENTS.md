<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Versionamento do site

- Toda melhoria publicada deve incrementar a versão patch em `package.json`.
- Mantenha a mesma versão no `package-lock.json` e em `SITE_VERSION` dentro de `src/routes/index.tsx`.
- Use incremento patch para melhorias e correções compatíveis; reserve mudanças minor/major para alterações de produto ou compatibilidade.
