import { AfterViewChecked, Component, inject, input, OnInit, ViewChild } from '@angular/core';
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';
import { TimeagoModule } from 'ngx-timeago';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-messages',
  standalone: true,
  imports: [TimeagoModule, FormsModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css',
})
export class MemberMessagesComponent implements OnInit , AfterViewChecked{
 
  @ViewChild('messageForm') messageFrom?: NgForm;
  @ViewChild('scrollMe') scrollContainer?: any;
  messageService = inject(MessageService);
  username = input.required<string>();

  messages: Message[] = [];
  messageContent = '';

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessageThread(this.username()).subscribe({
      next: (messages) => (this.messages = messages),
    });
  }

  sendMessage() {
    this.messageService
      .sendMessage(this.username(), this.messageContent).then(() => {
        this.messageFrom?.reset();
        this.scrollToBottom();
      });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(){
    if(this.scrollContainer){
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }
}
