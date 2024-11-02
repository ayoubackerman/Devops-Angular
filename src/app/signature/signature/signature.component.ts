import { Component, ViewChild, OnInit } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad';
import { SignatureService } from 'src/app/Services/signature/signature.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss']
})
export class SignatureComponent implements OnInit {
  @ViewChild(SignaturePad) signaturePad!: SignaturePad;

  public signaturePadOptions: Object = { 
    minWidth: 2,
    canvasWidth: 500,
    canvasHeight: 300
  };

  signatures: string[] = []; // To hold the fetched signatures

  constructor(private signatureService: SignatureService) {}

  ngOnInit(): void {
    this.loadSignatures();
  }

  clearSignature() {
    this.signaturePad.clear();
  }

  saveSignature() {
    const signatureDataUrl = this.signaturePad.toDataURL();
    this.signatureService.saveSignature(signatureDataUrl).subscribe(
      response => {
        console.log('Signature saved successfully!', response);
        this.loadSignatures(); // Reload signature after saving
        Swal.fire({
          title: 'Success!',
          text: response.message,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      error => {
        console.error('Error saving signature', error);
        Swal.fire({
          title: 'Error!',
          text: 'There was an error saving your signature. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  loadSignatures() {
    this.signatureService.getSignatures().subscribe(
      (data: any[]) => {
        this.signatures = data.map(signature => signature.signatureData); // Store signature data
      },
      error => {
        console.error('Error loading signatures', error);
      }
    );
  }

  drawComplete() {
    console.log('Drawing complete!');
  }
}
