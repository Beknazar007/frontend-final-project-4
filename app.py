from flask import Flask, render_template, request

app = Flask(__name__)

# Define currency exchange rates
exchange_rates = {
    'SOM': {'EUR': 85, 'GBP': 75, 'JPY': 110, 'AUD': 1.3, 'CAD': 1.25, 'INR': 75.0, 'CNY': 6.5, 'BRL': 5.0, 'ZAR': 15.0, 'RUB': 75.0,'bread': 2.0,'milk': 1.5,'drink': 3.0,},
    # 'USD': {'EUR': 0.85, 'GBP': 0.75, 'JPY': 110.0, 'AUD': 1.3, 'CAD': 1.25, 'INR': 75.0, 'CNY': 6.5, 'BRL': 5.0, 'ZAR': 15.0, 'RUB': 75.0},
    # 'EUR': {'USD': 1.18, 'GBP': 0.88, 'JPY': 133.4, 'AUD': 1.58, 'CAD': 1.47, 'INR': 88.3, 'CNY': 7.56, 'BRL': 6.0, 'ZAR': 17.9, 'RUB': 88.3},
    # 'GBP': {'USD': 1.34, 'EUR': 1.14, 'JPY': 151.5, 'AUD': 1.78, 'CAD': 1.66, 'INR': 99.6, 'CNY': 8.56, 'BRL': 6.77, 'ZAR': 20.1, 'RUB': 99.6},
    # # Add more currencies and their conversion rates as needed
}

# Define item prices in dollars
item_prices = {
    'bread': 2.0,
    'milk': 1.5,
    'drink': 3.0,
    # Add more items and their prices as needed
}

@app.route('/')
def index():
    from_currency = [currency for currency in exchange_rates.keys()]
    to_currencies = [currency for rates in exchange_rates.values() for currency in rates.keys()]
    items = item_prices.keys()
    return render_template('index.html', from_currency=from_currency, to_currencies=to_currencies, items=items)

@app.route('/convert', methods=['POST'])
def convert():
    amount = float(request.form['amount'])
    from_currency = request.form['from_currency']
    to_currency = request.form['to_currency']
    item_to_buy = request.form['item_to_buy']

    if from_currency == to_currency:
        result = amount
    else:
        conversion_rate = exchange_rates[from_currency][to_currency]
        result = amount * conversion_rate

    # Calculate how many items you can buy with the converted amount
    items_bought = result / item_prices[item_to_buy]

    return render_template('result.html', amount=amount, from_currency=from_currency,
                           to_currency=to_currency, result=result, items_bought=items_bought, item_to_buy=item_to_buy)

if __name__ == '__main__':
    app.run(debug=True)
