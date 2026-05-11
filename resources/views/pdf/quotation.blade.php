@extends('pdf.layouts.master')

@section('title', 'Quotation - ' . $quotation->quotation_number)

@section('content')
    @php
        if (!function_exists('formatSouthAsian')) {
            function formatSouthAsian($num) {
                $parts = explode('.', number_format($num, 2, '.', ''));
                $whole = $parts[0];
                $decimal = $parts[1];

                $numStr = (string)$whole;
                if (strlen($numStr) <= 3) {
                    $formattedWhole = $numStr;
                } else {
                    $lastThree = substr($numStr, -3);
                    $restUnits = substr($numStr, 0, -3);
                    $restUnits = preg_replace("/\B(?=(\d{2})+(?!\d))/", ",", $restUnits);
                    $formattedWhole = $restUnits . ',' . $lastThree;
                }

                return $decimal != '00' ? $formattedWhole . '.' . $decimal : $formattedWhole;
            }
        }

        if (!function_exists('numberToWords')) {
            function numberToWords($number) {
                $hyphen      = ' ';
                $conjunction = ' ';
                $separator   = ' ';
                $negative    = 'negative ';
                $decimal     = ' point ';
                $dictionary  = array(
                    0                   => 'zero',
                    1                   => 'one',
                    2                   => 'two',
                    3                   => 'three',
                    4                   => 'four',
                    5                   => 'five',
                    6                   => 'six',
                    7                   => 'seven',
                    8                   => 'eight',
                    9                   => 'nine',
                    10                  => 'ten',
                    11                  => 'eleven',
                    12                  => 'twelve',
                    13                  => 'thirteen',
                    14                  => 'fourteen',
                    15                  => 'fifteen',
                    16                  => 'sixteen',
                    17                  => 'seventeen',
                    18                  => 'eighteen',
                    19                  => 'nineteen',
                    20                  => 'twenty',
                    30                  => 'thirty',
                    40                  => 'forty',
                    50                  => 'fifty',
                    60                  => 'sixty',
                    70                  => 'seventy',
                    80                  => 'eighty',
                    90                  => 'ninety',
                    100                 => 'hundred',
                    1000                => 'thousand',
                    100000              => 'lac',
                    10000000            => 'crore'
                );

                if (!is_numeric($number)) {
                    return false;
                }

                $number = (int)$number;

                if ($number < 0) {
                    return $negative . numberToWords(abs($number));
                }

                $string = null;

                switch (true) {
                    case $number < 21:
                        $string = $dictionary[$number];
                        break;
                    case $number < 100:
                        $tens   = ((int) ($number / 10)) * 10;
                        $units  = $number % 10;
                        $string = $dictionary[$tens];
                        if ($units) {
                            $string .= $hyphen . $dictionary[$units];
                        }
                        break;
                    case $number < 1000:
                        $hundreds  = (int)($number / 100);
                        $remainder = $number % 100;
                        $string = $dictionary[$hundreds] . ' ' . $dictionary[100];
                        if ($remainder) {
                            $string .= $conjunction . numberToWords($remainder);
                        }
                        break;
                    case $number < 100000:
                        $thousands   = (int) ($number / 1000);
                        $remainder = $number % 1000;

                        $string = numberToWords($thousands) . ' ' . $dictionary[1000];
                        if ($remainder) {
                            $string .= $separator . numberToWords($remainder);
                        }
                        break;
                    case $number < 10000000:
                        $lacs   = (int) ($number / 100000);
                        $remainder = $number % 100000;

                        $string = numberToWords($lacs) . ' ' . $dictionary[100000];
                        if ($remainder) {
                            $string .= $separator . numberToWords($remainder);
                        }
                        break;
                    default:
                        $crores   = (int) ($number / 10000000);
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

    <style>
        .section{
            margin-bottom: 18px;
        }

        .subject{
            margin: 20px 0;
            font-weight: bold;
        }

        .paragraph{
            margin-bottom: 15px;
            text-align: justify;
        }

        .signature{
            margin-top: 40px;
        }

        .signature-img {
            max-height: 60px;
            max-width: 150px;
            display: block;
            margin-bottom: 5px;
        }

        .product-title{
            text-align: center;
            font-size: 18px;
            color: #a31c1c;
            font-weight: bold;
            margin-bottom: 20px;
            text-decoration: underline;
        }

        .info-table{
            width: 100%;
            margin-bottom: 20px;
        }

        .info-table td{
            padding: 5px 0;
        }

        .product-table{
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        .product-table th{
            background: #666;
            color: #fff;
            border: 1px solid #000;
            padding: 8px;
            font-size: 11px;
        }

        .product-table td{
            border: 1px solid #000;
            padding: 8px;
            vertical-align: top;
            font-size: 11px;
        }

        .summary-table{
            width: 250px;
            border-collapse: collapse;
            margin-left: auto;
            margin-bottom: 20px;
        }

        .summary-table td{
            border: 1px solid #000;
            padding: 6px;
            font-size: 11px;
        }

        .summary-label{
            font-weight: bold;
            background: #f2f2f2;
        }

        .amount-word{
            margin-bottom: 40px;
            font-weight: bold;
        }

        .terms-title{
            font-size: 16px;
            font-weight: bold;
            text-decoration: underline;
            margin-bottom: 15px;
        }

        .terms-list{
            margin-left: 20px;
        }

        .terms-list li{
            margin-bottom: 10px;
            text-align: justify;
            font-size: 11px;
        }

        .thanks{
            text-align: center;
            margin-top: 50px;
            font-size: 14px;
            font-weight: bold;
        }

        .page-number{
            text-align: right;
            margin-top: 10px;
            font-size: 10px;
        }
    </style>

    <!-- PAGE 1 -->
    <div class="page-content">

        <div class="section">
            Date: {{ $quotation->quotation_date->format('d F Y') }}
        </div>

        <div class="section">
            To,<br><br>

            <strong>{{ $quotation->customer->name }}</strong><br>
            @if($quotation->customer->designation)
                {{ $quotation->customer->designation }}<br>
            @endif
            @if($quotation->customer->company)
                {{ $quotation->customer->company->name }}<br>
            @endif
            @if($quotation->customer->addresses && count($quotation->customer->addresses) > 0)
                {{ $quotation->customer->addresses[0] }}<br>
            @endif
            Cell: {{ $quotation->customer->phones[0] ?? '' }}
            @if($quotation->customer->email)
                | Email: {{ $quotation->customer->email }}
            @endif
        </div>

        <div class="subject">
            Subject: Technical & Financial Offer for Supply and Installation of Security Systems.
        </div>

        <div class="paragraph">
            Dear Sir,
        </div>

        <div class="paragraph">
            With due respect and reference to your recent inquiry,
            we are pleased to submit our Technical and Financial Offer
            for the above-mentioned items to your esteemed organization.
        </div>

        <div class="paragraph">
            We are committed to delivering genuine branded products,
            ensuring quality, reliability, and comprehensive after-sales service support.
        </div>

        <div class="paragraph">
            Thanking you and assuring you of our best cooperation at all times.
        </div>

        <div class="signature">
            <strong>With Thanks and Best Regards,</strong><br><br><br>

            @if($quotation->user && $quotation->user->signature)
                <img src="{{ public_path('storage/' . $quotation->user->signature) }}" class="signature-img">
            @endif

            <strong>{{ $quotation->user->name ?? 'Authorized Signature' }}</strong><br>
            {{ $quotation->user->role == 'super_admin' ? 'Super Admin' : 'Sales Executive' }}<br>
            Crystal Vision Solutions
            M: +8801332-803463 | +8801911-561554 (WhatsApp);

            E-mail: {{ $quotation->user->email }} | crystalsolutionsbd@gmail.com

            <strong>Corporate Office: </strong>Tower 71, Level-8, Near ECB Circle, Dhaka Cantonment, Dhaka-1206

            Elephant Road Branch: 95, City Super Market (Level 4), New Elephant Road, Dhaka
        </div>

        <div class="page-number">
            Page 1 of 3
        </div>

    </div>

    <div class="page-break"></div>

    <!-- PAGE 2 -->
    <div class="page-content">

        <div class="product-title">
            Product Details & Pricing
        </div>

        <table class="info-table">
            <tr>
                <td>
                    <strong>Quotation No:</strong>
                    {{ $quotation->quotation_number }}
                </td>

                <td class="text-right">
                    <strong>Date:</strong>
                    {{ $quotation->quotation_date->format('d F Y') }}
                </td>
            </tr>
        </table>

        <table class="product-table">
            <thead>
                <tr>
                    <th width="5%">SL</th>
                    <th width="55%">Description</th>
                    <th width="10%">Qty</th>
                    <th width="15%">Unit Price</th>
                    <th width="15%">Total</th>
                </tr>
            </thead>
            <tbody>
                @foreach($quotation->items as $index => $item)
                <tr>
                    <td class="text-center">{{ str_pad($index + 1, 2, '0', STR_PAD_LEFT) }}</td>
                    <td>
                        <strong>{{ $item->product_name ?? ($item->product ? $item->product->name : 'N/A') }}</strong>
                        @if($item->product)
                            <br><span style="font-size: 9px; color: #555;">{{ $item->product->description }}</span>
                            @if($item->product->warranty)
                                <br><span style="font-size: 9px; color: #a31c1c;"><strong>Warranty:</strong> {{ $item->product->warranty }} {{ $item->product->warranty_duration_unit }}</span>
                            @endif
                        @endif
                    </td>
                    <td class="text-center">{{ $item->quantity }}</td>
                    <td class="text-center">{{ formatSouthAsian($item->unit_price) }}</td>
                    <td class="text-right">{{ formatSouthAsian($item->total) }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <table class="summary-table">
            <tr>
                <td class="summary-label">Total</td>
                <td class="text-right">{{ formatSouthAsian($quotation->subtotal) }}</td>
            </tr>
            @if($quotation->tax > 0)
            <tr>
                <td class="summary-label">VAT/Tax</td>
                <td class="text-right">{{ formatSouthAsian($quotation->tax) }}</td>
            </tr>
            @endif
            @if($quotation->discount > 0)
            <tr>
                <td class="summary-label">Discount</td>
                <td class="text-right">- {{ formatSouthAsian($quotation->discount) }}</td>
            </tr>
            @endif
            <tr>
                <td class="summary-label">Grand Total</td>
                <td class="text-right">{{ formatSouthAsian($quotation->total) }}</td>
            </tr>
        </table>

        <div class="amount-word">
            Amount in words: {{ ucfirst(numberToWords($quotation->total)) }} Taka Only.
        </div>

        <strong>Thanks & Regards,</strong><br><br><br>

        @if($quotation->user && $quotation->user->signature)
            <img src="{{ public_path('storage/' . $quotation->user->signature) }}" class="signature-img">
        @endif

        <strong>{{ $quotation->user->name ?? 'Authorized Signature' }}</strong><br>
        {{ $quotation->user->role == 'super_admin' ? 'Super Admin' : 'Sales Executive' }}<br>
        Crystal Vision Solutions

        <div class="page-number">
            Page 2 of 3
        </div>

    </div>

    <div class="page-break"></div>

    <!-- PAGE 3 -->
    <div class="page-content">

        <div class="terms-title">
            Terms & Conditions
        </div>

        @if($quotation->terms_conditions)
            <div style="font-size: 11px; line-height: 1.8;">
                {!! nl2br(e($quotation->terms_conditions)) !!}
            </div>
        @else
            <ol class="terms-list">
                <li>Price validity is valid for 7 days from the date of issue.</li>
                <li>Price may change based on currency conversion rate.</li>
                <li>Delivery within agreed time after confirmed PO.</li>
                <li>Payment terms will be discussed mutually.</li>
                <li>Standard manufacturer warranty applicable.</li>
                <li>VAT & Tax applicable as per government rules.</li>
            </ol>
        @endif

        @if($quotation->notes)
        <div style="margin-top: 30px;">
            <h4 style="margin-bottom: 10px; text-decoration: underline;">Additional Notes:</h4>
            <div style="font-size: 11px; background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
                {!! nl2br(e($quotation->notes)) !!}
            </div>
        </div>
        @endif

        <div class="thanks">
            Thanks for getting in touch with Crystal Vision Solutions
        </div>

        <div class="page-number">
            Page 3 of 3
        </div>

    </div>

@endsection
