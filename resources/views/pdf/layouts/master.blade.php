<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>@yield('title')</title>
    <style>
        @page {
            margin: 140px 35px 120px 35px;
        }
        header {
            position: fixed;
            top: -110px;
            left: 0px;
            right: 0px;
            height: 100px;
            border-bottom: 2px solid #a31c1c;
        }
        footer {
            position: fixed;
            bottom: -90px;
            left: 0px;
            right: 0px;
            height: 100px;
            background: #a31c1c;
            color: #fff;
            padding: 10px 15px;
        }
        body {
            font-family: 'DejaVu Sans', sans-serif;
            font-size: 12px;
            color: #000;
            line-height: 1.5;
        }
        .page-break {
            page-break-after: always;
        }

        /* Header Styles */
        .header-table {
            width: 100%;
        }
        .header-table td {
            vertical-align: middle;
        }
        .logo {
            width: 120px;
        }
        .company-name {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: #a31c1c;
        }
        .header-right {
            text-align: right;
            font-size: 10px;
        }
        .header-right span {
            color: #a31c1c;
            font-weight: bold;
        }
        .service-bar {
            border-top: 1px solid #a31c1c;
            border-bottom: 1px solid #a31c1c;
            padding: 4px 0;
            margin-top: 5px;
            text-align: center;
            font-size: 9px;
            font-weight: bold;
        }

        /* Footer Styles */
        .footer-table {
            width: 100%;
            border-collapse: collapse;
        }
        .footer-table td {
            width: 33%;
            vertical-align: top;
            text-align: center;
            padding: 0 5px;
        }
        .footer-title {
            font-size: 11px;
            font-weight: bold;
            margin-bottom: 3px;
        }
        .footer-text {
            font-size: 8px;
            line-height: 1.2;
        }
        .footer-contact {
            margin-top: 8px;
            text-align: center;
            font-size: 9px;
            border-top: 1px solid rgba(255,255,255,0.4);
            padding-top: 5px;
        }

        .content {
            width: 100%;
        }
    </style>
</head>
<body>
    <header>
        <style>
    .header-table {
        width: 100%;
        border-collapse: collapse;
    }

    .header-table td {
        vertical-align: middle;
        padding: 5px 10px;
    }

    .logo {
        max-height: 60px;
        object-fit: contain;
    }

    .company-center {
        text-align: center;
    }

    .company-right {
        text-align: right;
        font-size: 12px;
        line-height: 1.4;
    }

    .company-right strong {
        font-size: 13px;
    }

    .tagline {
        color: #555;
        font-size: 11px;
    }
</style>

<table class="header-table">
    <tr>
        <!-- Left Logo -->
        <td width="20%">
            <img src="{{ public_path('logo.png') }}" class="logo">
        </td>

        <!-- Center Logo / Company Branding -->
        <td width="60%" class="company-center">
            <img src="{{ public_path('crystal-logo-png.png') }}" class="logo">
        </td>

        <!-- Right Info -->
        <td width="20%" class="company-right">
            <strong>www.crystalcomputers.com.bd</strong><br>
            <span class="tagline">Leading ICT and Security Services Provider</span>
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
                    <div class="footer-text">Tabas Building (Level-5), 53/2 New Elephant Road, Dhaka-1205</div>
                </td>
                <td>
                    <div class="footer-title">Corporate Office</div>
                    <div class="footer-text">Tower 71 (Level-8), Near ECB Circle, Dhaka Cantonment</div>
                </td>
                <td>
                    <div class="footer-title">Service Centre</div>
                    <div class="footer-text">Tabas Building (Level-5), 53/2 New Elephant Road, Dhaka-1205</div>
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
