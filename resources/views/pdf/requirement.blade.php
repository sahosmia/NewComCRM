@extends('pdf.layouts.master')

@section('title', 'Requirement - ' . ($requirement->title ?? $requirement->id))

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

    {{-- Page 1: Introduction --}}
    <div class="page">
        <div style="text-align: right; margin-bottom: 30px;">
            <strong>Date:</strong> {{ $requirement->created_at->format('d M, Y') }}
        </div>

        <div style="margin-bottom: 30px;">
            <strong>To,</strong><br>
            <strong>{{ $requirement->customer->name }}</strong><br>
            @if($requirement->customer->designation)
                {{ $requirement->customer->designation }}<br>
            @endif
            @if($requirement->customer->company)
                <strong>{{ $requirement->customer->company->name }}</strong><br>
            @endif
            @if($requirement->customer->addresses && count($requirement->customer->addresses) > 0)
                {{ $requirement->customer->addresses[0] }}<br>
            @endif
            {{ $requirement->customer->phones[0] ?? '' }}
        </div>

        <div style="margin-bottom: 30px;">
            <strong>Subject: {{ $requirement->title ?? 'Requirement Specification for Security Systems' }}</strong>
        </div>

        <div style="margin-bottom: 30px; line-height: 1.6;">
            Dear Sir,<br><br>
            With reference to our recent discussion, we are pleased to submit our technical and financial requirement specification for your kind consideration. Crystal Vision Solutions is committed to providing state-of-the-art security and networking solutions tailored to your specific needs.<br><br>
            Our proposed solution has been designed keeping in view the highest standards of reliability, scalability, and performance. We believe that our expertise in the field of security systems, interactive displays, and smart devices will provide significant value to your organization.<br><br>
            Please find the detailed specifications and commercial terms in the following pages.
        </div>
    </div>

    <div class="page-break"></div>

    {{-- Page 2: Specifications & Table --}}
    <div class="page">
        <div style="margin-bottom: 20px; font-weight: bold; font-size: 14px; color: #ed1c24; border-bottom: 1px solid #ed1c24; padding-bottom: 5px;">
            Technical & Financial Specifications
        </div>

        <style>
            .goods-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }
            .goods-table thead th {
                background-color: #4a4a4a;
                color: white;
                text-align: center;
                padding: 8px;
                border: 1px solid #333;
                font-size: 11px;
            }
            .goods-table td {
                padding: 8px;
                border: 1px solid #333;
                vertical-align: middle;
                font-size: 11px;
            }
            .text-center { text-align: center; }
            .text-right { text-align: right; }
            .font-bold { font-weight: bold; }
        </style>

        <table class="goods-table">
            <thead>
                <tr>
                    <th style="width: 30px;">SL</th>
                    <th>Description of Goods & Specifications</th>
                    <th style="width: 70px;">Quantity</th>
                    <th style="width: 80px;">Unit Price (BDT)</th>
                    <th style="width: 90px;">Total (BDT)</th>
                </tr>
            </thead>
            <tbody>
                @php
                    $aitFactor = 1;
                    if ($requirement->ait_percentage > 0 && $requirement->ait_percentage < 100) {
                        $aitFactor = 1 / (1 - ($requirement->ait_percentage / 100));
                    }
                @endphp
                @foreach($requirement->items as $index => $item)
                <tr>
                    <td class="text-center">{{ str_pad($index + 1, 2, '0', STR_PAD_LEFT) }}</td>
                    <td>
                        <strong>{{ $item->product->name }}</strong>
                        @if($item->product->description)
                            <br><span style="font-size: 10px; color: #555;">{{ $item->product->description }}</span>
                        @endif
                    </td>
                    <td class="text-center">{{ $item->quantity }} {{ $item->product->unit?->short_form ?? 'Units' }}</td>
                    <td class="text-right">{{ formatSouthAsian($item->unit_price * $aitFactor) }}</td>
                    <td class="text-right">{{ formatSouthAsian($item->total_price) }}/=</td>
                </tr>
                @endforeach

                @php $sl = count($requirement->items); @endphp

                @if($requirement->has_accessories)
                @php $sl++; @endphp
                <tr>
                    <td class="text-center">{{ str_pad($sl, 2, '0', STR_PAD_LEFT) }}</td>
                    <td>
                        <strong>{{ $requirement->accessories_title }}</strong>
                        <br><span style="font-size: 10px; color: #555;">Required cables, connectors, and mounting accessories.</span>
                    </td>
                    <td class="text-center">{{ $requirement->accessories_quantity }} {{ $requirement->accessoriesUnit?->short_form ?? 'Lot' }}</td>
                    <td class="text-right">{{ formatSouthAsian($requirement->accessories_price * $aitFactor) }}</td>
                    <td class="text-right">{{ formatSouthAsian($requirement->accessories_quantity * $requirement->accessories_price * $aitFactor) }}/=</td>
                </tr>
                @endif

                @if($requirement->has_installation)
                @php $sl++; @endphp
                <tr>
                    <td class="text-center">{{ str_pad($sl, 2, '0', STR_PAD_LEFT) }}</td>
                    <td>
                        <strong>{{ $requirement->installation_title }}</strong>
                        <br><span style="font-size: 10px; color: #555;">Professional installation, configuration, and testing service.</span>
                    </td>
                    <td class="text-center">{{ $requirement->installation_quantity }} {{ $requirement->installationUnit?->short_form ?? 'Units' }}</td>
                    <td class="text-right">{{ formatSouthAsian($requirement->installation_price * $aitFactor) }}</td>
                    <td class="text-right">{{ formatSouthAsian($requirement->installation_quantity * $requirement->installation_price * $aitFactor) }}/=</td>
                </tr>
                @endif
            </tbody>
            @php
                $itemsTotal = $requirement->items->sum('total_price');
                $accessoriesTotal = $requirement->has_accessories ? ($requirement->accessories_quantity * $requirement->accessories_price * $aitFactor) : 0;
                $installationTotal = $requirement->has_installation ? ($requirement->installation_quantity * $requirement->installation_price * $aitFactor) : 0;
                $subTotal = $itemsTotal + $accessoriesTotal + $installationTotal;
                $vatAmount = $requirement->vat_percentage > 0 ? ($subTotal * ($requirement->vat_percentage / 100)) : 0;
                $aitAmount = 0;
                if ($requirement->ait_percentage > 0 && $requirement->ait_percentage < 100) {
                    $aitAmount = $subTotal - ($subTotal / $aitFactor);
                }
                $grandTotal = $requirement->grand_total;
            @endphp
            <tfoot>
                <tr>
                    <td colspan="4" class="text-right font-bold">Total (Excl. VAT)</td>
                    <td class="text-right font-bold">{{ formatSouthAsian($subTotal) }}/=</td>
                </tr>
                @if($requirement->vat_percentage > 0)
                <tr>
                    <td colspan="4" class="text-right font-bold">VAT ({{ $requirement->vat_percentage }}%)</td>
                    <td class="text-right">{{ formatSouthAsian($vatAmount) }}/=</td>
                </tr>
                @endif
                @if($requirement->ait_percentage > 0)
                <tr>
                    <td colspan="4" class="text-right font-bold">AIT ({{ $requirement->ait_percentage }}%)</td>
                    <td class="text-right">{{ formatSouthAsian($aitAmount) }}/=</td>
                </tr>
                @endif
                <tr style="background-color: #f9f9f9;">
                    <td colspan="4" class="text-right font-bold" style="font-size: 13px;">Grand Total</td>
                    <td class="text-right font-bold" style="font-size: 13px; color: #ed1c24;">{{ formatSouthAsian($grandTotal) }}/=</td>
                </tr>
            </tfoot>
        </table>

        <div style="margin-top: 10px;">
            <strong>Amount in word:</strong> {{ ucfirst(numberToWords($grandTotal)) }} only.
        </div>
    </div>

    <div class="page-break"></div>

    {{-- Page 3: Terms & Signature --}}
    <div class="page">
        <div style="margin-bottom: 20px; font-weight: bold; font-size: 14px; color: #ed1c24; border-bottom: 1px solid #ed1c24; padding-bottom: 5px;">
            Terms & Conditions
        </div>

        <div style="font-size: 11px; line-height: 1.8;">
            <table style="border: none; width: 100%;">
                <tr style="border: none;">
                    <td style="border: none; width: 150px; font-weight: bold; vertical-align: top;">Price Validity:</td>
                    <td style="border: none; vertical-align: top;">This proposal is valid for {{ $requirement->price_validity_days ?? '07' }} days from the date of issuance.</td>
                </tr>
                <tr style="border: none;">
                    <td style="border: none; font-weight: bold; vertical-align: top;">Delivery Time:</td>
                    <td style="border: none; vertical-align: top;">{{ $requirement->delivery_time_days ?? '03-05' }} working days after receiving the formal work order.</td>
                </tr>
                <tr style="border: none;">
                    <td style="border: none; font-weight: bold; vertical-align: top;">Payment Terms:</td>
                    <td style="border: none; vertical-align: top;">{{ $requirement->advance_payment ?? '50' }}% advance with work order, and the remaining {{ $requirement->before_payment ?? '50' }}% before delivery/installation.</td>
                </tr>
                <tr style="border: none;">
                    <td style="border: none; font-weight: bold; vertical-align: top;">Warranty:</td>
                    <td style="border: none; vertical-align: top;">Standard manufacturer warranty applies to all hardware. Service warranty provided for 01 year.</td>
                </tr>
                <tr style="border: none;">
                    <td style="border: none; font-weight: bold; vertical-align: top;">Delivery Location:</td>
                    <td style="border: none; vertical-align: top;">{{ $requirement->delivery_location ?? 'As per discussion' }}</td>
                </tr>
            </table>
        </div>

        @if($requirement->notes)
        <div style="margin-top: 30px;">
            <h4 style="margin-bottom: 10px; text-decoration: underline;">Additional Notes:</h4>
            <div style="font-size: 11px; background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
                {!! nl2br(e($requirement->notes)) !!}
            </div>
        </div>
        @endif

        <div style="margin-top: 50px; line-height: 1.6;">
            We look forward to your positive response and hope to build a long-term business relationship with your esteemed organization.<br><br>
            Sincerely yours,
        </div>

        <div class="signature-section" style="margin-top: 40px;">
            <div class="signature-box">
                @if(Auth::user() && Auth::user()->signature)
                    <img src="{{ public_path('storage/' . Auth::user()->signature) }}" class="signature-img" alt="Signature">
                @else
                    <div style="height: 60px;"></div>
                @endif
                <div class="signature-line">
                    {{ Auth::user()->name ?? 'Authorized Signature' }}<br>
                    <span style="font-size: 10px; font-weight: normal;">{{ Auth::user()->role == 'super_admin' ? 'Super Admin' : 'Sales Executive' }}</span>
                </div>
            </div>
        </div>
    </div>

@endsection
