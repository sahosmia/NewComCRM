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
            margin-top: 20px;
            position: relative;
            font-family: Arial, sans-serif;
            font-size: 13px;
            line-height: 1.5;
            color: #000;
        }

        .signature-container {
            position: relative;
            height: 100px;
        }

        .sig-img {
            position: absolute;
            left: 0;
            top: 20px;
            width: 150px;
            z-index: 2;
        }

        .seal-img {
            position: absolute;
            left: 80px;
            top: 0px;
            width: 110px;
            z-index: 1;
            opacity: 0.8;
        }

        .info-text {
            margin-top: 10px;
            clear: both;
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
            /* গাঢ় লাল */
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
            list-style-type: none;
            padding: 0;
            margin: 0;
        }

        .terms-list li {
            margin-bottom: 8px;
            text-align: justify;
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
            /* ধূসর ব্যাকগ্রাউন্ড */
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

        .text-center {
            text-align: center;
        }

        .text-right {
            text-align: right;
        }

        /* টোটাল সেকশনের জন্য বিশেষ স্টাইল */
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
            font-size: 12px;
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
                    <img src="{{ $header_logo_1 }}" style="width: 100;">
                </td>
                <td class="company-name-section">
                    <img src="{{ $header_logo_2 }}" style="width: 100%;">
                </td>
                <td class="contact-section">
                    <a href="http://www.crystalcomputers.com.bd">www.crystalcomputers.com.bd</a><br>
                    <span style="color: #A52A2A; font-weight: bold; letter-spacing: -1px;">LEADING ICT AND SECURITY
                        SERVICES PROVIDER</span>
                </td>
            </tr>
        </table>

        <div class="service-bar">
            Server <span>|</span>
            Server Spare Parts <span>|</span>
            Networking Equipment's <span>|</span>
            Security Equipment's <span>|</span>
            Sound Equipment's <span>|</span>
            Smart Device <span>|</span>
            Interactive Display
        </div>
    </header>

    <main>
        <div style="margin: -20px 28px 0; text-align: justify; font-size: 15px;">
            <div class="recipient-info">
                Date: {{ date('d F Y', strtotime($date)) }}<br><br>

                To,<br>
                <strong>{{ $requirement->customer->name }}</strong><br>
                {{ $requirement->customer->designation }}<br>
                {{ $requirement->customer->company->name ?? 'N/A' }}<br>
                {{ $requirement->customer->company->address ?? 'N/A' }}<br>
                Cell: +88{{ $requirement->customer->phones[0] ?? '' }} | E-mail: {{ $requirement->customer->email }}
            </div>

            <div class="subject-line">
                <span style="color: #2F5496;">Subject:</span>
                <span class="subject-blue">Technical & Financial Offer for</span>
                <span class="subject-blue" style="color: blue;">Supply
                    {{ $requirement->has_installation ? 'and Installation' : '' }}</span>
                of <span class="subject-red">{{ $requirement->title ?? 'Required Items' }}</span>.
            </div>
            <p>Dear Sir,
                <br />
                With due respect and reference to your recent inquiry, we are pleased to submit our Technical and
                Financial Offer for the above-mentioned items to your esteemed organization as per your
                requirements.
                <br /><br />

                We, Crystal Vision Solutions, are an experienced and trusted importer, supplier, and system integrator
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
                <p style="margin-bottom: 5px;">With Thanks and Best Regards,</p>

                <div class="signature-container">
                    @if ($signature)
                        <img src="{{ $signature }}" class="sig-img">
                    @endif

                    @if ($seal)
                        <img src="{{ $seal }}" class="seal-img">
                    @endif
                </div>

                <div class="info-text">
                    <strong>{{ $requirement->customer->assignedUser->name }}</strong><br>
                    {{ $requirement->customer->assignedUser->designation }}<br>
                    <strong>Crystal Vision Solutions</strong><br>
                    M: +88{{ $requirement->customer->assignedUser->phone }} | +8801911-561554
                    (WhatsApp);<br>
                    E-mail: {{ $requirement->customer->assignedUser->email }} |
                    crystalsolutionsbd@gmail.com

                    <div class="office-info">
                        <strong>Corporate Office:</strong> Tower 71, Level-8, Near ECB Circle, Dhaka Cantonment,
                        Dhaka-1206 <br />
                        <strong>Elephant Road Branch:</strong> 95, City Super Market (Level 4), New Elephant Road, Dhaka
                    </div>
                </div>
            </div>


        </div>

        <div class="page-break"></div> <!-- Forced Page Break -->

        <div style="margin: -20px 28px 0; text-align: justify; font-size: 15px;">

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
                                <strong>{{ $item->product->name }}</strong> -
                                Brand & Model: {{ $item->product->brand }} {{ $item->product->model }}<br>
                                {{ $item->product->description }}
                                {{-- @if ($item->warranty)
                                    <strong>Warranty:</strong> {{ $item->warranty }}
                                @endif --}}
                            </td>
                            <td class="text-center">{{ $item->quantity }} {{ $item->product->unit->title ?? 'Unit' }}
                            </td>
                            <td class="text-right">{{ number_format($item->unit_price, 0) }}</td>
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
                                    0 => 'zero',
                                    1 => 'one',
                                    2 => 'two',
                                    3 => 'three',
                                    4 => 'four',
                                    5 => 'five',
                                    6 => 'six',
                                    7 => 'seven',
                                    8 => 'eight',
                                    9 => 'nine',
                                    10 => 'ten',
                                    11 => 'eleven',
                                    12 => 'twelve',
                                    13 => 'thirteen',
                                    14 => 'fourteen',
                                    15 => 'fifteen',
                                    16 => 'sixteen',
                                    17 => 'seventeen',
                                    18 => 'eighteen',
                                    19 => 'nineteen',
                                    20 => 'twenty',
                                    30 => 'thirty',
                                    40 => 'forty',
                                    50 => 'fifty',
                                    60 => 'sixty',
                                    70 => 'seventy',
                                    80 => 'eighty',
                                    90 => 'ninety',
                                    100 => 'hundred',
                                    1000 => 'thousand',
                                    100000 => 'lac',
                                    10000000 => 'crore',
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
                        <tr>
                            <td class="text-center">{{ str_pad($currentSl, 2, '0', STR_PAD_LEFT) }}</td>
                            <td><strong>Accessories Charge</strong> ({{ $requirement->accessories_title }})</td>
                            <td class="text-center">{{ $requirement->accessories_quantity }}
                                {{ $requirement->accessories_unit_id }}</td>
                            <td class="text-right">{{ number_format($requirement->accessories_price, 0) }}</td>
                            <td class="text-right">
                                {{ number_format(($requirement->accessories_price * $requirement->accessories_quantity * 100) / (100 - $requirement->ait_percentage), 0) }}/=
                            </td>

                        </tr>
                        @php $grandTotal += ($requirement->accessories_price * $requirement->accessories_quantity *100) / (100 - $requirement->ait_percentage); @endphp
                    @endif
                    @if ($requirement->has_installation)
                        <tr>
                            <td class="text-center">{{ str_pad($currentSl, 2, '0', STR_PAD_LEFT) }}</td>
                            <td><strong>Installation Charge</strong> ({{ $requirement->installation_title }})</td>
                            <td class="text-center">{{ $requirement->installation_quantity }}
                                {{ $requirement->installation_unit_id }}</td>
                            <td class="text-right">{{ number_format($requirement->installation_price, 0) }}</td>
                            <td class="text-right">
                                {{ number_format(($requirement->installation_price * $requirement->installation_quantity * 100) / (100 - $requirement->ait_percentage), 0) }}/=
                            </td>

                        </tr>
                        @php $grandTotal += ($requirement->installation_price * $requirement->installation_quantity *100) / (100 - $requirement->ait_percentage); @endphp
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
                        <td class="text-right">VAT</td>
                        <td class="text-right">{{ $requirement->vat_percentage }}%</td>
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
                <p style="margin-bottom: 5px; font-weight: bold;">Thanks & Regards</p>

                <div class="signature-container">
                    @if ($signature)
                        <img src="{{ $signature }}" class="sig-img">
                    @endif

                    @if ($seal)
                        <img src="{{ $seal }}" class="seal-img">
                    @endif
                </div>

                <div class="info-text">
                    <strong>{{ $requirement->customer->assignedUser->name }}</strong><br>
                    {{ $requirement->customer->assignedUser->designation }}<br>
                    <strong>Crystal Vision Solutions</strong><br>

                </div>
            </div>
        </div>


        <div class="page-break"></div> <!-- Forced Page Break -->
        <div style="margin: -20px 28px 0; text-align: justify; font-size: 15px;">

            <div class="terms-section">
                <div class="terms-title">Terms & Condition:</div>

                <ol class="terms-list">
                    <li>
                        <span class="term-head">1. Price Validity:</span> This quotation is valid for
                        {{ $requirement->price_validity_days ?? '______' }} days from the
                        date of issue.
                    </li>
                    <li>
                        <span class="term-head">2. Price Change:</span> Price may be changed based on the currency
                        conversion rate (Global USD and RMB) at any time by Crystal Vision Solutions.
                    </li>
                    <li>
                        <span class="term-head">3. Delivery Time:</span> Delivery will be completed within
                        {{ $requirement->delivery_time_days ?? '______' }} days/weeks
                        after receiving confirmed Purchase Order (PO) and advance payment (if applicable).
                    </li>
                    <li>
                        <span class="term-head">4. Payment Terms:</span>
                        {{ $requirement->advance_payment ?? '______' }}%
                        Advance with Purchase Order {{ $requirement->before_payment ?? '______' }}% Before
                        Delivery / After Installation (Or as mutually agreed).
                    </li>
                    <li>
                        <span class="term-head">5. Payment Method:</span> Cash / Bank transfer / Cheque to be made
                        favoring
                        "Crystal Vision Solutions".
                    </li>
                    <li>
                        <span class="term-head">6. Order Confirmation Policy:</span> No order will be processed,
                        confirmed,
                        or scheduled for delivery until the agreed advance payment is received. Delivery timelines will
                        be
                        counted from the date of advance payment realization.
                    </li>
                    <li>
                        <span class="term-head">7. Warranty:</span> Standard Manufacturer Warranty covers as per
                        Brand/OEM.
                    </li>
                    <li>
                        <span class="term-head">8. Installation & Commissioning:</span> Installation and configuration
                        will
                        be provided (if applicable).
                    </li>
                    <li>
                        <span class="term-head">9. After Sales Support:</span> We ensure technical support and service
                        during the warranty period.
                    </li>
                    <li>
                        <span class="term-head">10. Delivery Location:</span> Delivery will be made at your <span
                            class="red-text"> {{ $requirement->delivery_location ?? 'specified location' }} </span>.
                    </li>

                    <li>
                        <span class="term-head">11. Taxes & Duties:</span> All prices are <span
                            class="red-text">{{ $requirement->vat_percentage > 0 ? 'inclusive' : 'exclusive' }} of VAT,
                            AIT,</span> and duties (mention clearly).
                    </li>
                    <li>
                        <span class="term-head">12. Cancellation Policy:</span> Order once confirmed cannot be canceled
                        without mutual agreement.
                    </li>
                    <li>
                        <span class="term-head">13. Change Policy:</span> Overseas Items as per customer demand cannot
                        be
                        Changeable.
                    </li>
                    <li>
                        <span class="term-head">14. Force Majeure:</span> Delivery may be delayed due to circumstances
                        beyond our control, including customs delays, freight issues, weather conditions, or other
                        unforeseen events.
                    </li>
                </ol>

                <div class="thanks-footer">
                    Thanks for get in touch with Crystal Vision Solutions
                </div>
            </div>
        </div>

    </main>

    <footer>
        <div class="page-number-text">
            <script type="text/php">
            if ( isset($pdf) ) {
                $font = $fontMetrics->get_font("Arial, Helvetica, sans-serif", "normal");
                $pdf->page_text(500, 730, "Page {PAGE_NUM} of 3", $font, 9, array(0,0,0));
            }
        </script>
        </div>

        <table class="footer-address-table">
            <tr>
                <td>
                    <span class="branch-name">Elephant Road Branch</span>
                    Tabas Building (Level-5), 53/2 New Elephant Road<br>
                    Dhaka-1205, Bangladesh
                </td>
                <td>
                    <span class="branch-name">Corporate Office</span>
                    Tower 71 (Level-8, C-9), 516/3 South Manikdi, Near ECB Circle<br>
                    Dhaka Cantonment, Dhaka-1206, Bangladesh
                </td>
                <td>
                    <span class="branch-name">Service Centre</span>
                    Tabas Building (Level-5), 53/2 New Elephant Road<br>
                    Dhaka-1205, Bangladesh
                </td>
            </tr>
        </table>

        <div class="contact-bar">
            E-mail: info@crystalcomputers.com.bd, Hunting: 09666733744, Mobile: 01730-495650, 01730-495651
        </div>
        <div class="empty-bar">

        </div>
    </footer>

</body>

</html>
