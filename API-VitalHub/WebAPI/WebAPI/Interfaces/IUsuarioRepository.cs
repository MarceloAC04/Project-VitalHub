using WebAPI.Domains;

namespace WebAPI.Interfaces
{
    public interface IUsuarioRepository
    {
       public void Cadastrar(Usuario usuario);

        public Usuario BuscarPorId(Guid id);

        public Usuario BuscarPorEmailESenha(string email, string senha);

       public bool AlterarSenha(string email, string senhaNova);

        public void AtualizarFoto(Guid id, string novaUrlFoto);

    }
}
