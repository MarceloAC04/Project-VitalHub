using Azure.Storage.Blobs;

namespace WebAPI.Utils.BlobStorage
{
    public static class AzureBlobStorageHelper
    {
        public static async Task<string> UploadImageBlobAsync(IFormFile arquivo, string stringConexao, string nomeContainer)
        {
			try
			{
                //verifica se existe o arquivo
                if (arquivo != null)
                {
                   //gerar um nome único para a imagem]
                   var blobName = Guid.NewGuid().ToString().Replace("-","") + Path.GetExtension(arquivo.FileName);


                    //cria uma instancia do BlobServiceClient passando a string de conexao com o blob da Azure
                    var blobServiceClient = new BlobServiceClient(stringConexao);

                    //obtem dados do container client
                    var blobContainerClient = blobServiceClient.GetBlobContainerClient(nomeContainer);

                    //obtem um blobCLient usando o blob name
                    var blobClient = blobContainerClient.GetBlobClient(blobName);

                    //abre o fluxo de entrada do arquivo (foto)
                    using (var stream = arquivo.OpenReadStream())
                    {
                        //carrega o arquivo(foto) para o blob de forma assíncrona
                        await blobClient.UploadAsync(stream, true);
                    }

                    //retorna a uri do blob com uma string
                    return blobClient.Uri.ToString();
                }
                else
                {
                    //retorna a uri padrao
                    return "https://blockstoragevitalhubg5dm.blob.core.windows.net/blockcontainerg5dm/profilepattern.png";
                }
            }
			catch (Exception)
			{

				throw;
			}
        }
    }
}
