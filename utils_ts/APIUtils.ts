export class APIUtils{

    apiContext: any;
    loginPayload: any;

    constructor(apiContext: any, loginPayload: string){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }
 
    async getToken(){
        const loginResponse = await this.apiContext.post("https://www.rahulshettyacademy.com/api/ecom/auth/login", {data: this.loginPayload});
        const loginResponseJson = await loginResponse.json();
        console.log("Login response:", JSON.stringify(loginResponseJson));
        const token: string = loginResponseJson.token;
        console.log(token);
        return token;
    }

    async createOrder(orderPayload){
        let response: { token: string; orderId: string } = { token: '', orderId: '' };
        response.token = await this.getToken();

        const orderResponse = await this.apiContext.post("https://www.rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayload,
            headers: {
               'Authorization': response.token,
               'Content-Type': "application/json"
           }
        });
        const orderResponseJson = await orderResponse.json();
         const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;

        return response;
    }
}