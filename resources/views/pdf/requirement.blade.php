@extends('pdf.layouts.master')

@section('title', 'Requirement - REQ-' . $requirement->id)

@section('content')
    {{-- Page 1: Introduction --}}
    <div style="text-align: right; margin-bottom: 20px;">
        <strong>Date:</strong> {{ $requirement->created_at->format('d M, Y') }}
    </div>

    <div style="margin-bottom: 20px;">
        <strong>To,</strong><br>
        <strong>{{ $requirement->customer->name }}</strong><br>
        {{ $requirement->customer->designation }}<br>
        <strong>{{ $requirement->customer->company?->name }}</strong><br>
        {{ $requirement->customer->addresses[0] ?? '' }}
    </div>

    <div style="margin-bottom: 20px;">
        <strong>Subject: Financial Proposal for Supply and Installation of CCTV Surveillance Systems.</strong>
    </div>

    <div style="margin-bottom: 20px;">
        Dear Sir,<br>
        With reference to your request and reference to our recent inquiry, we are pleased to submit our Technical and Financial Offer for the above-mentioned items in your esteemed organization as per your requirement.
    </div>

    <div style="margin-bottom: 20px;">
        We, Crystal Vision Solutions, are an experienced and trusted importer, supplier, and system integrator of world-class security and IT related server solutions in Bangladesh. We are committed to delivering top-quality branded products, ensuring quality, reliability, and comprehensive after-sales service support.
    </div>

    <div style="margin-bottom: 20px;">
        Please find the enclosed Technical and Financial Proposal for your kind evaluation and necessary action. We believe that you will find our proposal competitive and our products ready for delivery for this project.
    </div>

    <div style="margin-bottom: 20px;">
        Should you require any further information or clarification, please feel free to contact us at your convenience.
    </div>

    <div style="margin-bottom: 20px;">
        Thanking you and assuring you of our best cooperation at all times.
    </div>

    <div style="margin-top: 40px;">
        With Thanks and Best Regards,<br><br><br>
        <strong>Authorized Signature</strong><br>
        Crystal Vision Solutions
    </div>

    <div class="page-break"></div>

    {{-- Page 2: Product Details & Prices --}}
    <div style="text-align: center; margin-bottom: 20px;">
        <h3 class="text-red">Product Details & Prices</h3>
    </div>

    <table>
        <thead>
            <tr>
                <th class="text-center">SL</th>
                <th>Description of Goods</th>
                <th class="text-center">Quantity</th>
                <th class="text-right">Unit Price</th>
                <th class="text-right">Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach($requirement->items as $index => $item)
            <tr>
                <td class="text-center">{{ $index + 1 }}</td>
                <td>
                    <strong>{{ $item->product->name }}</strong><br>
                    <span style="font-size: 10px;">{{ $item->product->brand }} | {{ $item->product->model }}</span>
                </td>
                <td class="text-center">{{ $item->quantity }}</td>
                <td class="text-right">{{ number_format($item->unit_price, 2) }}</td>
                <td class="text-right">{{ number_format($item->total_price, 2) }}</td>
            </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr>
                <td colspan="4" class="text-right font-bold">Grand Total</td>
                <td class="text-right font-bold">{{ number_format($requirement->grand_total, 2) }}</td>
            </tr>
        </tfoot>
    </table>

    <div style="margin-top: 20px;">
        <strong>Amount in word:</strong> {{ ucfirst(\Illuminate\Support\Str::words($requirement->grand_total)) }} only.
    </div>

    <div class="signature-section">
        <div class="signature-box">
            <div style="height: 60px;"></div>
            <div class="signature-line">
                Authorized Signature
            </div>
        </div>
    </div>

    <div class="page-break"></div>

    {{-- Page 3: Terms & Conditions --}}
    <div style="text-align: center; margin-bottom: 20px;">
        <h3 class="text-red">Terms & Conditions</h3>
    </div>

    <div style="font-size: 11px;">
        <ol>
            <li><strong>Price Validity:</strong> This quotation is valid for ___ days from the date of issue.</li>
            <li><strong>Price Change:</strong> Price may be changed based on the currency conversion rate (Global USD and BDT) at any time by company management.</li>
            <li><strong>Delivery Time:</strong> Delivery will be completed within ___ days/weeks after receiving confirmed work order and advance payment (if applicable).</li>
            <li><strong>Payment Terms:</strong> __% Advance with Purchase Order, __% Before Delivery / After Installation (Or mutually agreed).</li>
            <li><strong>Payment Method:</strong> Cash / Bank transfer/ Cheque to be made favoring "Crystal Vision Solutions". Note: No order will be processed, confirmed, or scheduled for delivery until the agreed advance payment is received. Delivery timelines will be counted from the date of advance payment realization.</li>
            <li><strong>Warranty:</strong> Standard Manufacturer Warranty covers as per Brand/OEM.</li>
            <li><strong>Installation & Commissioning:</strong> Installation and configuration will be provided (if applicable).</li>
            <li><strong>After-Sales Support:</strong> We ensure technical support service during the warranty period.</li>
            <li><strong>Delivery Location:</strong> Delivery will be made at your specified location.</li>
            <li><strong>Taxes & Duties:</strong> All prices are inclusive/exclusive of VAT, Tax, and duties (mention clearly).</li>
            <li><strong>Cancellation Policy:</strong> Order once confirmed cannot be cancelled without mutual agreement.</li>
            <li><strong>Force Majeure:</strong> Delivery may be delayed due to circumstances beyond our control, including customs delays, freight issues, weather conditions, or other unforeseen events.</li>
        </ol>
    </div>

    <div style="margin-top: 30px; text-align: center; font-style: italic;">
        Thanks for get in touch with Crystal Vision Solutions
    </div>
@endsection
