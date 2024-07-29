using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PrintifyManager.WebAPI.Services;

namespace PrintifyManager.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrintifyController : ControllerBase
    {
        private readonly PrintifyService _printifyService;

        public PrintifyController(PrintifyService printifyService)
        {
            _printifyService = printifyService;
        }

        [HttpGet("shops")]
        public async Task<IActionResult> GetShops()
        {
            var result = await _printifyService.GetShopsAsync();
            return Ok(result);
        }

        [HttpGet("shops/{shopId}/products")]
        public async Task<IActionResult> GetShopProducts(string shopId, [FromQuery] int limit = 15, [FromQuery] int page = 1)
        {
            var result = await _printifyService.GetShopProductsAsync(shopId, limit, page);
            return Ok(result);
        }

        [HttpGet("shops/{shopId}/products/{productId}")]
        public async Task<IActionResult> GetShopProductById(string shopId, string productId)
        {
            var result = await _printifyService.GetShopProductByIdAsync(shopId, productId);
            return Ok(result);
        }

        [HttpGet("shops/{shopId}/products/{productId}/setpublishsuccessed")]
        public async Task<IActionResult> SetProductPublishSuccessed(string shopId, string productId, string external)
        {
            var result = await _printifyService.SetProductPublishStatusAsync(shopId, productId, external);
            return Ok(result);
        }

        [HttpPost("shops/{shopId}/products/{productId}/publish")]
        public async Task<IActionResult> PublishProduct(string shopId, string productId)
        {
            var result = await _printifyService.PublishProductAsync(shopId, productId);
            return Ok(result);
        }
    }
}
