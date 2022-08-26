using AuthService.Data.Models;

namespace AuthService.UnitTest.MockData
{
    public class AuthMockData
    {
        public static SignUp GetSignUpDetails()
        {
            return new SignUp()
            {
                Name = "Jena",
                Email = "jena@cognizant.com",
                Password = "#Jena123",
                ConfirmPassword = "#Jena123",
                City = "Hyderabad"
            };
        }

        public static SignIn GetSignInDetails()
        {
            return new SignIn()
            {
                Username = "jena@cognizant.com",
                Password = "#Jena123"
            };
        }
    }
}