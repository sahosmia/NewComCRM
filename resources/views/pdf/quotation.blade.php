@extends('pdf.layouts.master')

@section('title', 'Quotation - ' . $quotation->quotation_number)

@section('content')
    <div style="text-align: right; margin-bottom: 20px;">
        <strong>Date:</strong> {{ $quotation->quotation_date->format('d M, Y') }}
    </div>

    <div style="margin-bottom: 20px;">
        <strong>To,</strong><br>
        <strong>{{ $quotation->customer->name }}</strong><br>
        {{ $quotation->customer->designation }}<br>
        <strong>{{ $quotation->customer->company_name }}</strong><br>
        {{ $quotation->customer->addresses[0] ?? '' }}
    </div>

    <div style="margin-bottom: 20px;">
        <strong>Subject: Quotation for Supply and Installation of Security Systems.</strong>
    </div>

    <div style="margin-bottom: 20px;">
        Dear Sir,<br>
        With reference to your inquiry, we are pleased to submit our best technical and financial offer for the following items:
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
            @foreach($quotation->items as $index => $item)
            <tr>
                <td class="text-center">{{ $index + 1 }}</td>
                <td>
                    <strong>{{ $item->product_name ?? ($item->product ? $item->product->name : 'N/A') }}</strong><br>
                    <span style="font-size: 10px;">{{ $item->product ? $item->product->description : '' }}</span>
                </td>
                <td class="text-center">{{ $item->quantity }}</td>
                <td class="text-right">{{ number_format($item->unit_price, 2) }}</td>
                <td class="text-right">{{ number_format($item->total, 2) }}</td>
            </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr>
                <td colspan="4" class="text-right font-bold">Subtotal</td>
                <td class="text-right">{{ number_format($quotation->subtotal, 2) }}</td>
            </tr>
            @if($quotation->discount > 0)
            <tr>
                <td colspan="4" class="text-right font-bold">Discount</td>
                <td class="text-right">{{ number_format($quotation->discount, 2) }}</td>
            </tr>
            @endif
            <tr>
                <td colspan="4" class="text-right font-bold">Grand Total</td>
                <td class="text-right font-bold">{{ number_format($quotation->total, 2) }}</td>
            </tr>
        </tfoot>
    </table>

    <div style="margin-top: 20px;">
        <strong>Amount in word:</strong> {{ ucfirst(\Illuminate\Support\Str::words($quotation->total)) }} only.
    </div>

    @if($quotation->terms_conditions)
    <div style="margin-top: 20px;">
        <h4 style="margin-bottom: 5px; text-decoration: underline;">Terms & Conditions:</h4>
        <div style="font-size: 11px;">
            {!! nl2br(e($quotation->terms_conditions)) !!}
        </div>
    </div>
    @endif

    <div class="signature-section">
        <div class="signature-box">
            @if($quotation->user && $quotation->user->signature)
                <img src="{{ public_path('storage/' . $quotation->user->signature) }}" class="signature-img" alt="Signature">
            @else
                <div style="height: 60px;"></div>
            @endif
            <div class="signature-line">
                {{ $quotation->user->name ?? 'Authorized Signature' }}<br>
                <span style="font-size: 10px; font-weight: normal;">{{ $quotation->user->role == 'super_admin' ? 'Super Admin' : 'Sales Executive' }}</span>
            </div>
        </div>
    </div>
@endsection
