<!DOCTYPE html>
<html>

<head>
    <style>
        * {
            font-family: Arial, sans-serif;
        }

        @page {
            margin: 150px 30px 0px;

        }


        .page-break {
            page-break-after: always;
        }

        header {
            position: fixed;
            top: -160px;
            left: 0px;
            right: 0px;
            height: 60px;
            font-family: Arial, sans-serif;
        }

        .header-top {
            width: 100%;
            border-collapse: collapse;
        }

        .logo-section {
            width: 25%;
            vertical-align: middle;
        }

        .company-name-section {
            width: 40%;
            text-align: center;
            vertical-align: middle;
        }


        .contact-section {
            width: 40%;
            text-align: right;
            vertical-align: middle;
            font-size: 13px;
        }

        .contact-section a {
            color: #000;
            text-decoration: none;
            font-weight: bold;
        }

        .contact-section span {
            font-size: 11px;
            font-weight: bold;
        }

        .service-bar {
            width: 116%;
            border-top: 2px solid #A52A2A;
            border-bottom: 2px solid #A52A2A;
            padding: 5px 0px;
            margin: -30px -50px;
            text-align: center;
            font-size: 11px;
            font-weight: bold;
            color: #333;


        }

        .service-bar span {
            padding: 0 2px;
            color: #A52A2A;
        }


        .signature-wrapper {
            margin-top: 30px;
            position: relative;
            font-family: 'Arial', 'Helvetica', sans-serif;
            font-size: 14px;
            line-height: 1.35;
            color: #000;
        }

        .regards-text {
            margin: 0 0 15px 0;
            font-size: 14px;
        }

        /* This structural wrapper layer lets assets float beneath the textual structure */
        .graphics-container {
            position: absolute;
            top: 15px;
            left: 0;
            width: 100%;
            height: 120px;
            pointer-events: none;
            /* Keeps text selectable in browser viewports */
        }

        .sig-img {
            position: absolute;
            left: 5px;
            top: 5px;
            width: 100px;
            z-index: 1;
        }

        .seal-img {
            position: absolute;
            left: 80px;
            /* Aligned precisely near the designation text start shift */
            top: -15px;
            /* Raised slightly upward to bleed behind 'With Thanks' and the name */
            width: 100px;
            /* Expanded scaling size to correctly bleed edge to edge across elements */
            z-index: 2;
            opacity: 0.85;
        }

        .info-text {
            position: relative;
            z-index: 5;
            /* Forces text to explicitly render dynamically above image layers */
            margin-top: 40px;
        }

        /* Typography specifics matching the weight patterns in the image */
        .sender-name {
            font-size: 15px;
            font-weight: normal;
        }

        .sender-designation {
            font-weight: normal;
        }

        .company-name {
            font-weight: normal;
        }

        .office-info {
            font-size: 11px;
            margin-top: 5px;
        }

        .recipient-info {
            font-family: Arial, sans-serif;
            font-size: 13px;
            line-height: 1.4;
            margin-top: 20px;
            color: #000;
        }

        .subject-line {
            font-family: Arial, sans-serif;
            font-size: 14px;
            margin-top: 20px;
            font-weight: normal;
        }

        .subject-blue {
            color: #2F5496;
            /* গাঢ় নীল */
            font-weight: bold;
        }

        .subject-red {
            color: #C00000;
            font-weight: bold;
        }

        .terms-section {
            font-family: 'Helvetica', 'Arial', sans-serif;
            font-size: 12px;
            color: #333;
            line-height: 1.5;
            margin-top: 30px;
        }

        .terms-title {
            font-weight: bold;
            text-decoration: underline;
            font-size: 14px;
            margin-bottom: 10px;
        }

        .terms-list {
            /* list-style-type: none; */
            padding-left: 20px;
            margin: 0;
        }

        .terms-list li {
            margin-bottom: 2px;
            text-align: justify;
            font-size: 14px;

        }

        .terms-list span.term-head {
            font-weight: bold;
        }

        .red-text {
            color: #d9534f;
        }

        .thanks-footer {
            margin-top: 40px;
            text-align: center;
            font-weight: bold;
            font-size: 14px;
        }


        .pricing-header {
            text-align: center;
            color: #C00000;
            font-size: 18px;
            font-weight: bold;
            text-decoration: underline;
            margin: 20px 0;
        }

        .product-table {
            width: 100%;
            border-collapse: collapse;
            font-family: Arial, sans-serif;
            font-size: 11px;
        }

        .product-table th {
            background-color: #595959;
            color: white;
            border: 1px solid #000;
            padding: 8px;
            text-align: center;
        }

        .product-table td {
            border: 1px solid #000;
            padding: 6px;
            vertical-align: middle;
        }

        .product-table tr {
            page-break-inside: avoid;
        }

        .text-center {
            text-align: center;
        }

        .text-right {
            text-align: right;
        }

        .total-row td {
            font-weight: bold;
            background-color: #f9f9f9;
        }

        .amount-in-word {
            margin-top: 10px;
            font-size: 12px;
            font-weight: bold;
        }




        footer {
            position: fixed;
            bottom: 0px;
            left: -30px;
            right: -30px;
            height: 120px;
            font-family: Arial, sans-serif;
            background-color: #8B1A1A;
        }

        .footer-address-table {
            width: 100%;
            border-collapse: collapse;
            color: white;
            text-align: center;
        }

        .footer-address-table td {
            width: 33.33%;
            padding: 10px 5px;
            vertical-align: top;
            font-size: 9px;
        }

        .footer-address-table td:last-child {
            border-right: none;
        }

        .branch-name {
            font-weight: bold;
            font-size: 11px;
            text-decoration: underline;
            margin-bottom: 5px;
            display: block;
        }

        .contact-bar {
            background-color: #8B1A1A;
            color: white;
            text-align: center;
            padding: 5px 0;
            font-size: 14px;
            font-weight: bold;
            border: 1px solid rgb(168, 168, 168);
            border-right: none;
            border-left: none
        }

        .empty-bar {
            height: 20px;
            background-color: #8B1A1A;

        }

        .page-number-text {
            text-align: right;
            font-size: 10px;
            font-style: italic;
            margin-bottom: 2px;
            color: #333;
        }
    </style>
</head>

<body>

    <header>
        <table class="header-top">
            <tr>
                <td class="logo-section">
                    @if ($header_logo_1)
                        <img src="{{ $header_logo_1 }}" style="width: 100;">
                    @endif
                </td>
                <td class="company-name-section">
                    @if ($header_logo_2)
                        <img src="{{ $header_logo_2 }}" style="width: 100%;">
                    @else
                        <h1 style="color: #A52A2A; margin: 0;">{{ setting('app_name', 'Crystal Vision Solutions') }}</h1>
                    @endif
                </td>
                <td class="contact-section">
                    <a
                        href="{{ setting('website_url', 'http://www.crystalcomputers.com.bd') }}">{{ str_replace(['http://', 'https://'], '', setting('website_url', 'www.crystalcomputers.com.bd')) }}</a><br>
                    <span
                        style="color: #A52A2A; font-weight: bold; letter-spacing: -1px;">{{ setting('branding_slogan', 'LEADING ICT AND SECURITY SERVICES PROVIDER') }}</span>
                </td>
            </tr>
        </table>

        <div class="service-bar">
            @if (setting('branding_services_bar'))
                @php
                    $services = explode('|', setting('branding_services_bar'));
                @endphp
                @foreach ($services as $index => $service)
                    {{ trim($service) }}@if ($index < count($services) - 1)
                        <span>|</span>
                    @endif
                @endforeach
            @else
                Server <span>|</span>
                Server Spare Parts <span>|</span>
                Networking Equipment's <span>|</span>
                Security Equipment's <span>|</span>
                Sound Equipment's <span>|</span>
                Smart Device <span>|</span>
                Interactive Display
            @endif
        </div>
    </header>

    <main>
        <div style="margin: -20px 28px 0; text-align: justify; font-size: 15px;">
            <div class="recipient-info">
                @php
                    $recipient = $requirement->quotationRecipient ?? $requirement->customer;
                @endphp
                Date: {{ date('d F Y', strtotime($date)) }}<br><br>

                To,<br>
                <strong>{{ $recipient->name }}</strong><br>
                {{ $recipient->designation }}<br>
                {{ $recipient->company->name ?? 'N/A' }}<br>
                {{ $recipient->company->address ?? 'N/A' }}<br>
                Cell: +88{{ $recipient->phones[0] ?? '' }} | E-mail: {{ $recipient->email }}
            </div>

            <div class="subject-line">
                <span>Subject: Technical & Comercial Proposal for Supply
                    {{ $requirement->has_installation ? 'and Installation' : '' }}
                    {{ $requirement->title ?? 'Required Items' }}</span>.
            </div>
            <p>Dear Sir,
                <br />
                With due respect and reference to your recent inquiry, we are pleased to submit our Technical and
                Financial Offer for the above-mentioned items to your esteemed organization as per your
                requirements.
                <br /><br />

                We, {{ setting('app_name', 'Crystal Vision Solutions') }}, are an experienced and trusted importer,
                supplier, and system integrator
                of IT, networking equipment, and server solutions in Bangladesh. We are committed to delivering
                genuine branded products, ensuring quality, reliability, and comprehensive after-sales service
                support.
                <br /><br />

                Please find the enclosed Technical and Financial Proposal for your kind evaluation and necessary
                action. We assure you of our best cooperation, competitive pricing, and timely delivery for this
                requirement.
                <br /><br />

                Should you require any further information or clarification, please feel free to contact us at your
                convenience.
                <br /><br />

                Thanking you and assuring you of our best cooperation at all times.

            </p>

            <div class="signature-wrapper">
                <p class="regards-text">With Thanks and Best Regards</p>

                <div class="graphics-container">
                    @if ($signature)
                        <img src="{{ $signature }}" class="sig-img" alt="Signature">
                    @endif

                    @if ($seal)
                        <img src="{{ $seal }}" class="seal-img" alt="Seal">
                    @endif
                </div>

                <div class="info-text">
                    @php
                        $sender = $requirement->quotationSender ?? $requirement->user;
                    @endphp
                    <span class="sender-name">{{ $sender->name }}</span><br>
                    @if ($sender->designation)
                        <span class="sender-designation">{{ $sender->designation }}</span><br>
                    @endif
                    <span class="company-name">{{ setting('app_name', 'Crystal Vision Solutions') }}</span><br>

                    M:
                    {{ $sender->phone ? '+88' . $sender->phone . ' | ' : '' }}+88{{ setting('support_whatsapp', '01911-561554') }}
                    (WhatsApp)<br>

                    Mail: {{ $sender->email }} | {{ setting('email', 'crystalsolutionsbd@gmail.com') }}<br>
                    Website: {{ setting('website', 'crystalcomputers.com.bd') }}
                </div>
            </div>


        </div>

        <div class="page-break"></div> <!-- Forced Page Break -->

        <div style="margin: -20px 28px 0; text-align: justify; font-size: 15px;">

            <div>
                <div>
Quotation No: CVS/QTN/{{ date('Y') }}/{{ date('m') }}/{{ str_pad($requirement->id, 4, '0', STR_PAD_LEFT) }}                </div>
                <div>
                    Date: {{ date('d F Y', strtotime($date)) }}
                </div>

            </div>

            <div class="pricing-header">Product Details & Pricing</div>

            <table class="product-table">
                <thead>
                    <tr>
                        <th style="width: 5%;">SL</th>
                        <th style="width: 55%;">Description of Goods</th>
                        <th style="width: 12%;">Quantity</th>
                        <th style="width: 13%;">Unit Price</th>
                        <th style="width: 15%;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    @php $grandTotal = 0; @endphp
                    @foreach ($requirement->items as $index => $item)
                        <tr>
                            <td class="text-center">{{ str_pad($index + 1, 2, '0', STR_PAD_LEFT) }}</td>
                            <td>
                                <strong>{{ $item->product->name }}</strong>
                                <br>
                                {{ $item->description ?? $item->product->description }}

                            </td>
                            <td class="text-center">{{ $item->quantity }}
                                {{ $item->product?->unit?->short_form ?? ($item->product?->unit?->title ?? 'Unit') }}
                            </td>
                            <td class="text-right">{{ number_format($item->total_price / ($item->quantity ?: 1), 0) }}</td>
                            <td class="text-right">{{ number_format($item->total_price, 0) }}/=</td>
                        </tr>
                        @php $grandTotal += $item->total_price; @endphp
                    @endforeach

                    @php
                        if (!function_exists('numberToWords')) {
                            function numberToWords($number)
                            {
                                $hyphen = ' ';
                                $conjunction = ' ';
                                $separator = ' ';
                                $negative = 'negative ';
                                $decimal = ' point ';
                                $dictionary = [
                                    0 => 'Zero',
                                    1 => 'One',
                                    2 => 'Two',
                                    3 => 'Three',
                                    4 => 'Four',
                                    5 => 'Five',
                                    6 => 'Six',
                                    7 => 'Seven',
                                    8 => 'Eight',
                                    9 => 'Nine',
                                    10 => 'Ten',
                                    11 => 'Eleven',
                                    12 => 'Twelve',
                                    13 => 'Thirteen',
                                    14 => 'Fourteen',
                                    15 => 'Fifteen',
                                    16 => 'Sixteen',
                                    17 => 'Seventeen',
                                    18 => 'Eighteen',
                                    19 => 'Nineteen',
                                    20 => 'Twenty',
                                    30 => 'Thirty',
                                    40 => 'Forty',
                                    50 => 'Fifty',
                                    60 => 'Sixty',
                                    70 => 'Seventy',
                                    80 => 'Eighty',
                                    90 => 'Ninety',
                                    100 => 'Hundred',
                                    1000 => 'Thousand',
                                    100000 => 'Lac',
                                    10000000 => 'Crore',
                                ];

                                if (!is_numeric($number)) {
                                    return false;
                                }

                                $number = (int) $number;

                                if ($number < 0) {
                                    return $negative . numberToWords(abs($number));
                                }

                                $string = null;

                                switch (true) {
                                    case $number < 21:
                                        $string = $dictionary[$number];
                                        break;
                                    case $number < 100:
                                        $tens = ((int) ($number / 10)) * 10;
                                        $units = $number % 10;
                                        $string = $dictionary[$tens];
                                        if ($units) {
                                            $string .= $hyphen . $dictionary[$units];
                                        }
                                        break;
                                    case $number < 1000:
                                        $hundreds = (int) ($number / 100);
                                        $remainder = $number % 100;
                                        $string = $dictionary[$hundreds] . ' ' . $dictionary[100];
                                        if ($remainder) {
                                            $string .= $conjunction . numberToWords($remainder);
                                        }
                                        break;
                                    case $number < 100000:
                                        $thousands = (int) ($number / 1000);
                                        $remainder = $number % 1000;

                                        $string = numberToWords($thousands) . ' ' . $dictionary[1000];
                                        if ($remainder) {
                                            $string .= $separator . numberToWords($remainder);
                                        }
                                        break;
                                    case $number < 10000000:
                                        $lacs = (int) ($number / 100000);
                                        $remainder = $number % 100000;

                                        $string = numberToWords($lacs) . ' ' . $dictionary[100000];
                                        if ($remainder) {
                                            $string .= $separator . numberToWords($remainder);
                                        }
                                        break;
                                    default:
                                        $crores = (int) ($number / 10000000);
                                        $remainder = $number % 10000000;

                                        $string = numberToWords($crores) . ' ' . $dictionary[10000000];
                                        if ($remainder) {
                                            $string .= $separator . numberToWords($remainder);
                                        }
                                        break;
                                }
                                return $string;
                            }
                        }
                    @endphp
                    @php
                        $currentSl = count($requirement->items);
                    @endphp
                    @if ($requirement->has_accessories)
                        @foreach ($requirement->accessories as $accessory)
                            <tr>
                                <td class="text-center">{{ str_pad($currentSl + 1, 2, '0', STR_PAD_LEFT) }}</td>
                                <td> {{ $accessory->title }}</td>
                                <td class="text-center">{{ $accessory->quantity }}
                                    {{ $accessory->unit?->short_form ?? ($accessory->unit?->title ?? 'Unit') }}</td>
                                <td class="text-right">{{ number_format($accessory->total_price / ($accessory->quantity ?: 1), 0) }}</td>
                                <td class="text-right">
                                    {{ number_format($accessory->total_price, 0) }}/=
                                </td>

                            </tr>
                            @php $grandTotal += $accessory->total_price; @endphp
                            @php $currentSl++; @endphp
                        @endforeach
                    @endif
                    @if ($requirement->has_installation)
                        @foreach ($requirement->installations as $installation)
                            <tr>
                                <td class="text-center">{{ str_pad($currentSl + 1, 2, '0', STR_PAD_LEFT) }}</td>
                                <td> {{ $installation->title }}</td>
                                <td class="text-center">{{ $installation->quantity }}
                                    {{ $installation->unit?->short_form ?? ($installation->unit?->title ?? 'Unit') }}
                                </td>
                                <td class="text-right">{{ number_format($installation->total_price / ($installation->quantity ?: 1), 0) }}</td>
                                <td class="text-right">
                                    {{ number_format($installation->total_price, 0) }}/=
                                </td>

                            </tr>
                            @php $grandTotal += $installation->total_price; @endphp
                            @php $currentSl++; @endphp
                        @endforeach
                    @endif

                    <tr class="total-row">
                        <td colspan="3" rowspan="3" style="border: none; background: white; vertical-align: top;">
                            <div class="amount-in-word">

                                @php
                                    $finalAmount = round(
                                        $grandTotal + $grandTotal * ($requirement->vat_percentage / 100),
                                    );
                                @endphp
                                Amount in word: {{ ucfirst(numberToWords($finalAmount)) }} only.
                            </div>
                        </td>
                        <td class="text-right">Total</td>
                        <td class="text-right">{{ number_format($grandTotal, 0) }}/=</td>
                    </tr>
                    <tr class="total-row">
                        <td class="text-right">VAT Amount</td>
                        <td class="text-right">
                            {{ number_format($grandTotal * ($requirement->vat_percentage / 100), 0) }}/=</td>
                    </tr>
                    <tr class="total-row">
                        <td class="text-right">Grand Total</td>
                        <td class="text-right">
                            {{ number_format($grandTotal + $grandTotal * ($requirement->vat_percentage / 100), 0) }}/=
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="signature-wrapper">
                <p class="regards-text">With Thanks and Best Regards</p>

                <div class="graphics-container">
                    @if ($signature)
                        <img src="{{ $signature }}" class="sig-img" alt="Signature">
                    @endif

                    @if ($seal)
                        <img src="{{ $seal }}" class="seal-img" alt="Seal">
                    @endif
                </div>

                <div class="info-text">
                    @php
                        $sender = $requirement->quotationSender ?? $requirement->user;
                    @endphp
                    <span class="sender-name">{{ $sender->name }}</span><br>
                    @if ($sender->designation)
                        <span class="sender-designation">{{ $sender->designation }}</span><br>
                    @endif
                    <span class="company-name">{{ setting('app_name', 'Crystal Vision Solutions') }}</span><br>

                    M:
                    {{ $sender->phone ? '+88' . $sender->phone . ' | ' : '' }}+88{{ setting('support_whatsapp', '01911-561554') }}
                    (WhatsApp)<br>

                    Mail: {{ $sender->email }} | {{ setting('email', 'crystalsolutionsbd@gmail.com') }}<br>
                    Website: {{ setting('website', 'crystalcomputers.com.bd') }}
                </div>
            </div>
        </div>


        <div class="page-break"></div> <!-- Forced Page Break -->
        <div style="margin: -20px 28px 0; text-align: justify; font-size: 15px;">

            <div class="terms-section">
                <div class="terms-title">Terms & Condition:</div>

                <ol class="terms-list">
                    <li>Price Validity:This quotation is valid for
                        <span class="term-head">{{ $requirement->price_validity_days ?? '______' }} days </span> from
                        the
                        date of issue.
                    </li>
                    <li>
                        Price Change: Price may be changed based on the currency
                        conversion rate (Global USD and RMB) at any time by
                        {{ setting('app_name', 'Crystal Vision Solutions') }}.
                    </li>
                    <li>
                        Delivery Time: Delivery will be completed within
                        <span class="term-head">{{ $requirement->delivery_time_days ?? '______' }} days</span>
                        after receiving confirmed Purchase Order (PO) and advance payment (if applicable).
                    </li>
                    <li>
                        Payment Terms:
                        <span class="term-head"> {{ $requirement->advance_payment ?? '______' }}% Advance </span> with
                        Purchase Order

                        @if ($requirement->before_payment > 0)
                            <span class="term-head"> {{ $requirement->before_payment }}% Before
                                Delivery/Installation</span> (Or as mutually agreed).
                        @elseif($requirement->after_payment > 0)
                            <span class="term-head"> {{ $requirement->after_payment }}% After Installation / Delivery.
                            </span>
                        @else
                            <span class="term-head"> ______% Before Delivery / After Installation (Or as mutually
                                agreed). </span>
                        @endif
                    </li>
                    <li>Payment Method: Cash / Bank transfer to be made favoring
                        "{{ setting('app_name', 'Crystal Vision Solutions') }}".</li>
                    <li>Order Confirmation Policy: No order will be processed, confirmed, or scheduled for
                        delivery until the agreed advance payment is received. Delivery timelines will be counted
                        from the date of advance payment realization</li>
                    <li>Warranty: Standard Manufacturer Warranty covers as per Brand/OEM.</li>
                    <li>Installation & Commissioning: Installation and configuration will be provided (if included).
                    </li>
                    <li>After Sales Support: We ensure technical support and service during the warranty period.</li>
                    <li>Delivery Location: Delivery will be made at your <span
                            class="term-head">{{ $requirement->delivery_location ?? 'specified location' }} </span>.
                    </li>

                    <li>Taxes & Duties: All prices are <span
                            class="red-text">{{ $requirement->vat_percentage > 0 ? 'inclusive' : 'exclusive' }} of VAT,
                            AIT,</span> and duties (mention clearly).</li>
                    <li>Cancellation Policy: Order once confirmed cannot be canceled without mutual agreement.</li>
                    <li>Change Policy: Overseas Items as per customer demand cannot be Changeable. </li>
                    <li>Force Majeure: Delivery may be delayed due to circumstances
                        beyond our control, including customs delays, freight issues, weather conditions, or other
                        unforeseen events.
                    </li>
                    <li>Warranty Process:

                        <ul>
                            <li> Customer must report the issue with detailed description or video through email.
                            </li>
                            <li> Physical/remote diagnostics may be conducted to confirm the fault.
                            </li>
                            <li> Once confirmed, replacement/repair process will begin based on availability.
                            </li>
                        </ul>
                    </li>
                    <li>
                        16. Exclusions:
                        <br>
                        The warranty does not cover:
                        <br>
                        <ul>
                            <li>Damage caused by misuse, improper installation, or external factors </li>
                            <li>Unauthorized modifications or repairs </li>
                            <li>Software-related issues</li>
                            <li>Physical damage, power surges, or environmental damage </li>
                        </ul>
                    </li>
                </ol>

                <div class="thanks-footer">
                    Thanks for get in touch with {{ setting('app_name', 'Crystal Vision Solutions') }}
                </div>
            </div>
        </div>

    </main>

    <footer>
        <div class="page-number-text">
            <script type="text/php">
            if ( isset($pdf) ) {
                $font = $fontMetrics->get_font("Arial, Helvetica, sans-serif", "normal");
                $pdf->page_text(500, 730, "Page {PAGE_NUM} of {PAGE_COUNT}", $font, 9, array(0,0,0));
            }
        </script>
        </div>

        <table class="footer-address-table">
            <tr>
                <td>
                    <span class="branch-name">{{ setting('office_name_1', 'Elephant Road Branch') }}</span>
                    {!! nl2br(
                        setting('office_address_1', "Tabas Building (Level-5), 53/2 New Elephant Road\nDhaka-1205, Bangladesh"),
                    ) !!}
                </td>
                <td>
                    <span class="branch-name">{{ setting('office_name_2', 'Corporate Office') }}</span>
                    {!! nl2br(
                        setting(
                            'office_address_2',
                            "Tower 71 (Level-8, C-9), 516/3 South Manikdi, Near ECB Circle\nDhaka Cantonment, Dhaka-1206, Bangladesh",
                        ),
                    ) !!}
                </td>
                <td>
                    <span class="branch-name">{{ setting('office_name_3', 'Service Centre') }}</span>
                    {!! nl2br(
                        setting('office_address_3', "Tabas Building (Level-5), 53/2 New Elephant Road\nDhaka-1205, Bangladesh"),
                    ) !!}
                </td>
            </tr>
        </table>

        <div class="contact-bar">
            {{ setting('footer_contact_info', 'E-mail: info@crystalcomputers.com.bd, Hunting: 09666733744, Mobile: 01730-495650, 01730-495651') }}
        </div>
        <div class="empty-bar">

        </div>
    </footer>

</body>

</html>
