using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;

namespace PrintifyManager.SDK
{
    public class PrintifyClient
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public PrintifyClient(IHttpClientFactory httpClientFactory, string apiKey)
        {
            _httpClient = httpClientFactory.CreateClient("PrintifyHttpClient");
            _httpClient.BaseAddress = new Uri("https://api.printify.com/v1/");
            _httpClient.DefaultRequestHeaders.Accept.Clear();
            _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
            _apiKey = apiKey;
        }

        public async Task<string> GetAsync(string endpoint)
        {
            HttpResponseMessage response = await _httpClient.GetAsync(endpoint);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }

        public async Task<string> PostAsync(string endpoint, HttpContent content)
        {
            HttpResponseMessage response = await _httpClient.PostAsync(endpoint, content);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }

        public async Task<string> PutAsync(string endpoint, HttpContent content)
        {
            HttpResponseMessage response = await _httpClient.PutAsync(endpoint, content);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }

        public async Task<string> DeleteAsync(string endpoint)
        {
            HttpResponseMessage response = await _httpClient.DeleteAsync(endpoint);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }

        public async Task<string> GetShopsAsync()
        {
            return await GetAsync("shops.json");
        }

        public async Task<string> GetShopProductsAsync(string shopId, int limit = 15, int page = 1)
        {
            return await GetAsync($"shops/{shopId}/products.json?limit={limit}&page={page}");
        }

        public async Task<string> GetShopProductByIdAsync(string shopId, string productId)
        {
            return await GetAsync($"shops/{shopId}/products/{productId}.json");
        }

        public async Task<string> SetProductPublishStatusAsync(string shopId, string productId, string external)
        {
            var endpoint = $"shops/{shopId}/products/{productId}/publishing_succeeded.json";
            var content = new StringContent(
                external, // Pass the string directly
                Encoding.UTF8,
                "application/json"
            );

            return await PostAsync(endpoint, content);
        }

        public async Task<string> PublishProductAsync(string shopId, string productId)
        {
            var endpoint = $"shops/{shopId}/products/{productId}/publish.json";
            var jsonPayload = new
            {
                title = true,
                description = true,
                images = true,
                variants = true,
                tags = true,
                keyFeatures = true,
                shipping_template = true
            };

            var content = new StringContent(
               JsonConvert.SerializeObject(jsonPayload),
                Encoding.UTF8,
                "application/json"
            );

            return await PostAsync(endpoint, content);
        }
    }
}
