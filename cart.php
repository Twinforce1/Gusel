<?php 
require_once __DIR__ . '/vendor/autoload.php';

use CdekSDK2\Client as SdekClient;
use CdekSDK2\Exceptions\AuthException;
use GuzzleHttp\Client as HttpClient;
use Mjelamanov\GuzzlePsr18\Client;

$guzzleClient = new HttpClient();
$client = new Client($guzzleClient);
$cdek = new SdekClient($client);
$cdek->setAccount('wqGwiQx0gg8mLtiEKsUinjVSICCjtTEP');
// $cdek->setAccount('eX4KxxGJsE6EZolYtYfozdWM2aQFIlta');
$cdek->setSecure('RmAmgvSgSl1yirlz9QupbzOJVqhCxcP5');
// $cdek->setSecure('W2w3X27AjC7KO5WzmXYxvXZet4yyzJos');
$cdek->setTest(true);

try {
    $cdek->authorize();
    $cdek->getToken();
    $cdek->getExpire();
    echo 'Authorized||';
} catch (AuthException $exception) {
    //Авторизация не выполнена, не верные account и secure
    echo $exception->getMessage();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name']);
    $phone = htmlspecialchars($_POST['phone']);
    $email = htmlspecialchars($_POST['email']);
    $comment = htmlspecialchars($_POST['comment']);
    echo "<p>Привет, $name!</p>";
}

use CdekSDK2\BaseTypes;

$order = BaseTypes\Order::create([
    //'number' => '3627',
    'tariff_code' => '136',
    'comment' => $comment,
    'sender' => BaseTypes\Contact::create([
        'name' => 'Vasya',
    ]),
    'recipient' => BaseTypes\Contact::create([
        'name' => $name,
        'phones' => [
            BaseTypes\Phone::create(['number' => $phone])
        ],
        'email' => $email
    ]),
    'from_location' => BaseTypes\Location::create([
        'code' => 137,
        'country_code' => 'ru'
    ]),
    'to_location' => BaseTypes\Location::create([ // Надо получать
        'code' => 270,
        'country_code' => 'ru',
        'address' => 'Титова 21 кв 9'
    ]),
    'packages' => [
        BaseTypes\Package::create([
            'number' => 'number1',
            'weight' => 1000,
            'length' => 12,
            'width' => 11,
            'height' => 8,
            'items' => [
                BaseTypes\Item::create([
                    'name' => 'Toys for man',
                    'ware_key' => 'Items_number_5',
                    'payment' => BaseTypes\Money::create(['value' => 0]),
                    'cost' => 0,
                    'weight' => 1000,
                    'amount' => 1,
                ]),
            ]
        ])
    ],
]);

// $result = $cdek->orders()->add($order);
// if ($result->isOk()) {
//     //Запрос успешно выполнился
//     $response_order = $cdek->formatResponse($result, BaseTypes\Order::class);
//     // получаем UUID заказа и сохраняем его
//     $uuid = $response_order->entity->uuid;

// }
// echo $response_order->entity->uuid;
// echo '||';

// $result = $cdek->orders()->get($uuid);
// if ($result->isOk()) {
//     //Запрос успешно выполнился
//     $response_order = $cdek->formatResponse($result, \CdekSDK2\Dto\OrderInfo::class);
//     $response_order->entity->uuid;
// }
// echo $response_order->entity->sender->name;
?>
