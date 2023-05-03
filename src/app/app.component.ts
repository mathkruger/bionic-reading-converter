import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Component } from "@angular/core";
import { FormatsEnum } from "./models/formats.enum";
import { ConvertionForm } from "./models/convertion-form.model";

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  public form: FormGroup<ConvertionForm>;
  public results: string = "";
  public formatsEnum = FormatsEnum;

  constructor() {
    this.form = new FormGroup<ConvertionForm>({
      text: new FormControl("This is just a text my friend", { validators: [Validators.required] }),
    });
  }

  public toBionicHTML(text: string | null = "") {
    if (!text) return "";

    const lines = text.split("\n");

    return lines.map(x => {
      const words = x.split(" ").map(y => y.trim());

      return words.map(y => {
        if (y.length <= 2) {
          return this.getBoldText(y);
        }

        const quantityToHighlight = Math.trunc(y.length / 2);
        const quantityToMaintain = Math.abs(y.length - quantityToHighlight);

        return `${this.getBoldText(y.substring(0, quantityToHighlight))}${y.substr(quantityToHighlight, quantityToMaintain)}`;
      }).join(" ");
    }).join("<br />");
  }

  public onSubmit() {
    const { text } = this.form.getRawValue();
    this.results = this.toBionicHTML(text);
    console.log(this.results);
  }

  public export(id: string) {
    const element: HTMLElement | null = document.getElementById(id);
    if (!element) {
      throw new Error("ID does not exists, impossible to generate PDF file.");
    }
    const fileName = prompt("Document title");

    const htmlToSave = `
      <html>
        <head>
          <title>${fileName}</title>
          <style>
            font-weight: 800;
          </style>
        </head>
        <body>
          ${element.innerHTML}
        </body>
      </html>
    `;

    const link = document.createElement('a');
    link.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlToSave));
    link.setAttribute('download', (fileName || "results") + ".html");
    link.click();
  }

  private getBoldText(text: string) {
    return `<strong>${text}</strong>`;
  }
}
