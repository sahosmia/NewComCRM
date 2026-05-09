<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>@yield('title')</title>
    <style>
        @page {
            margin: 160px 35px 130px 35px;
        }
        *{
            margin:0;
            padding:0;
            box-sizing:border-box;
        }
        body{
            font-family: 'DejaVu Sans', sans-serif;
            color:#000;
            font-size:12px;
            line-height:1.5;
        }
        header {
            position: fixed;
            top: -135px;
            left: 0px;
            right: 0px;
            height: 120px;
            border-bottom: 2px solid #a31c1c;
            padding-bottom: 10px;
        }
        footer {
            position: fixed;
            bottom: -110px;
            left: 0px;
            right: 0px;
            height: 110px;
            background: #a31c1c;
            color: #fff;
            padding: 15px;
        }
        .content {
            width: 100%;
        }
        .page-break {
            page-break-after: always;
        }

        /* Header Styles from user template */
        .header-table{
            width:100%;
        }
        .header-table td{
            vertical-align:middle;
        }
        .logo{
            width:130px;
        }
        .company-name{
            text-align:center;
            font-size:26px;
            font-weight:bold;
            color:#a31c1c;
        }
        .header-right{
            text-align:right;
            font-size:10px;
        }
        .header-right span{
            color:#a31c1c;
            font-weight:bold;
        }
        .service-bar{
            border-top:1px solid #a31c1c;
            border-bottom:1px solid #a31c1c;
            padding:5px 0;
            margin-top:8px;
            text-align:center;
            font-size:9px;
            font-weight:bold;
        }

        /* Footer Styles from user template */
        .footer-table{
            width:100%;
            border-collapse:collapse;
        }
        .footer-table td{
            width:33%;
            vertical-align:top;
            text-align:center;
            padding:0 10px;
        }
        .footer-title{
            font-size:12px;
            font-weight:bold;
            margin-bottom:4px;
        }
        .footer-text{
            font-size:9px;
            line-height:1.3;
        }
        .footer-contact{
            margin-top:10px;
            text-align:center;
            font-size:10px;
            border-top:1px solid rgba(255,255,255,0.4);
            padding-top:8px;
        }
    </style>
</head>
<body>
    <header>
        <table class="header-table">
            <tr>
                <td width="20%">
                    <img src="{{ public_path('logo.png') }}" class="logo">
                </td>
                <td width="50%" class="company-name">
                    Crystal Vision Solutions
                </td>
                <td width="30%" class="header-right">
                    <strong>www.crystalcomputers.com.bd</strong><br>
                    <span>Leading ICT and Security Services Provider</span>
                </td>
            </tr>
        </table>
        <div class="service-bar">
            Server | Server Spare Parts | Networking Equipment | Security Equipment | Sound Equipment | Smart Device | Interactive Display
        </div>
    </header>

    <footer>
        <table class="footer-table">
            <tr>
                <td>
                    <div class="footer-title">Elephant Road Branch</div>
                    <div class="footer-text">Tabas Building (Level-5),<br>53/2 New Elephant Road<br>Dhaka-1205</div>
                </td>
                <td>
                    <div class="footer-title">Corporate Office</div>
                    <div class="footer-text">Tower 71 (Level-8)<br>Near ECB Circle<br>Dhaka Cantonment</div>
                </td>
                <td>
                    <div class="footer-title">Service Centre</div>
                    <div class="footer-text">Tabas Building (Level-5),<br>53/2 New Elephant Road<br>Dhaka-1205</div>
                </td>
            </tr>
        </table>
        <div class="footer-contact">
            E-mail: info@crystalcomputers.com.bd | Mobile: 01730-495650
        </div>
    </footer>

    <div class="content">
        @yield('content')
    </div>
</body>
</html>
