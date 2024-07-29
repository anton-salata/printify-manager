using PrintifyManager.SDK;

namespace PrintifyManager.WebAPI.Services
{
    public class PrintifyService
    {
        private readonly PrintifyClient _printifyClient;

        public PrintifyService(PrintifyClient printifyClient)
        {
            _printifyClient = printifyClient;
        }

        public async Task<string> GetShopsAsync()
        {
            return await _printifyClient.GetShopsAsync();
        }

        public async Task<string> GetShopProductsAsync(string shopId, int limit = 15, int page = 1)
        {
            return await _printifyClient.GetShopProductsAsync(shopId, limit, page);
        }

        public async Task<string> GetShopProductByIdAsync(string shopId, string productId)
        {
            return await _printifyClient.GetShopProductByIdAsync(shopId, productId);
        }


        public async Task<string> SetProductPublishStatusAsync(string shopId, string productId, string external)
        {
            return await _printifyClient.SetProductPublishStatusAsync(shopId, productId, external);
        }

        public async Task<string> PublishProductAsync(string shopId, string productId)
        {
            return await _printifyClient.PublishProductAsync(shopId, productId);
        }
    }
}
