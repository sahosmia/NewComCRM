<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>@yield('title')</title>
    <style>
        @page {
            margin: 100px 50px;
        }
        header {
            position: fixed;
            top: -80px;
            left: 0px;
            right: 0px;
            height: 80px;
            text-align: center;
            border-bottom: 2px solid #ed1c24;
        }
        footer {
            position: fixed;
            bottom: -80px;
            left: 0px;
            right: 0px;
            height: 60px;
            text-align: center;
            border-top: 2px solid #ed1c24;
            font-size: 10px;
            color: #555;
            padding-top: 10px;
        }
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            font-size: 12px;
            color: #333;
            line-height: 1.4;
        }
        .page-break {
            page-break-after: always;
        }
        .logo {
            height: 40px;
        }
        .company-info {
            font-size: 10px;
            color: #555;
        }
        .content {
            margin-top: 20px;
        }
        .signature-section {
            margin-top: 30px;
        }
        .signature-box {
            width: 200px;
            text-align: center;
        }
        .signature-img {
            max-height: 60px;
            max-width: 150px;
            display: block;
            margin: 0 auto 5px auto;
        }
        .signature-line {
            border-top: 1px solid #000;
            padding-top: 5px;
            font-size: 11px;
            font-weight: bold;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid #333;
        }
        th, td {
            padding: 5px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .font-bold { font-weight: bold; }
        .text-red { color: #ed1c24; }
    </style>
</head>
<body>
    <header>
        <div style="float: left;">
            <h2 style="margin: 0; color: #ed1c24;">Crystal Vision Solutions</h2>
            <div class="company-info">Security Equipment | Networking Equipment | Audio & Video Systems | Smart Devices | Interactive Display</div>
        </div>
        <div style="float: right;">
            <div class="company-info">
                www.crystalvisionbd.com<br>
                Sales: +8801730-493600<br>
                Service Center: +8801730-493601
            </div>
        </div>
        <div style="clear: both;"></div>
    </header>

    <footer>
        <div style="float: left; text-align: left; width: 33%;">
            <strong>Elephant Road Branch:</strong><br>
            Multiplan Center, Level-2, Shop-201
        </div>
        <div style="float: left; text-align: center; width: 34%;">
            <strong>Corporate Office:</strong><br>
            Tower-71, Level-11, West Agargaon
        </div>
        <div style="float: left; text-align: right; width: 33%;">
            <strong>Service Center:</strong><br>
            Multiplan Center, Level-6, Shop-611
        </div>
    </footer>

    <div class="content">
        @yield('content')
    </div>
</body>
</html>
