using AuthService.Controllers;
using AuthService.Data.DTO;
using AuthService.Services;
using AuthService.UnitTest.MockData;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace AuthService.UnitTest.Systems.Controllers
{
    public class AuthControllerTests
    {
        [Fact]
        public async void SignUp_ShouldReturn200Status()
        {
            var data = AuthMockData.GetSignUpDetails();

            var userSerive = new Mock<IUserService>();
            var rabbitMQService = new Mock<IRabbitMQService>();
            userSerive.Setup(_ => _.SignUpAsync(data)).ReturnsAsync(IdentityResult.Success);
            rabbitMQService.Setup(_ => _.PublishUser(data));
            var sut = new AuthController(userSerive.Object, rabbitMQService.Object);

            var result = (OkObjectResult)await sut.SignUp(data);

            result.StatusCode.Should().Be(200);
        }

        [Fact]
        public async void SignUp_ShouldReturn400Status()
        {
            var data = AuthMockData.GetSignUpDetails();

            var userSerive = new Mock<IUserService>();
            var rabbitMQService = new Mock<IRabbitMQService>();
            userSerive.Setup(_ => _.SignUpAsync(data)).ReturnsAsync(IdentityResult.Failed());
            var sut = new AuthController(userSerive.Object, rabbitMQService.Object);

            var result = (BadRequestObjectResult)await sut.SignUp(data);

            result.StatusCode.Should().Be(400);
        }

        [Fact]
        public async void Login_ShouldReturn200Status()
        {
            var data = AuthMockData.GetSignInDetails();
            LoginReturn? res = new() { Token = "token", Type = "User" };

            var userSerive = new Mock<IUserService>();
            var rabbitMQService = new Mock<IRabbitMQService>();
            userSerive.Setup(_ => _.LoginAsync(data)).ReturnsAsync(res);
            var sut = new AuthController(userSerive.Object, rabbitMQService.Object);

            var result = (OkObjectResult)await sut.LogIn(data);

            result.StatusCode.Should().Be(200);
        }

        [Fact]
        public async void Login_ShouldReturn400Status()
        {
            var data = AuthMockData.GetSignInDetails();
            LoginReturn? res = null;

            var userSerive = new Mock<IUserService>();
            var rabbitMQService = new Mock<IRabbitMQService>();
            userSerive.Setup(_ => _.LoginAsync(data)).ReturnsAsync(res);
            var sut = new AuthController(userSerive.Object, rabbitMQService.Object);

            var result = (UnauthorizedObjectResult)await sut.LogIn(data);

            result.StatusCode.Should().Be(401);
        }
    }
}